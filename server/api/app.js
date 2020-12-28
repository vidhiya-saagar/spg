const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes/index');
const s3Service = require('./services/s3Service');

// CORS
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://spg.dev',
  'https://3.93.172.82',
  '3.93.172.82',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

// Middleware
app.use(
  morgan(':date :method :url :status :res[content-length] - :response-time ms')
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SPG 📖',
  });
});

app.use('/api/v1', routes);

app.use('/s3', s3Service);

const port = process.env.PORT || 1469;
app.listen(port, () => {
  console.log(`Listening @ http://localhost:${port}/`);
});
