const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./db');

const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SPG 📖',
  });
});

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.get('/chapters', async (req, res) => {
  const chapters = await db.select('*').from('chapters');
  res.json({ chapters });
});

app.get('/chhands', async (req, res) => {
  const chhands = await db.select('*').from('chhands');
  res.json({ chhands });
});

app.get('/tuks', async (req, res) => {
  const tuks = await db.select('*').from('tuks');
  res.json({ tuks });
});

const port = process.env.PORT || 1469;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
