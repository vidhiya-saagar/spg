const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes/index');

// CORS
const whitelist = ['http://localhost:8080', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SPG 📖',
  });
});

app.use('/api/v1', routes);

const port = process.env.PORT || 1469;
app.listen(port, () => {
  console.log(`Listening @ http://localhost:${port}/`);
});
