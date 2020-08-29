const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// CORS
// var whitelist = ['http://localhost:8080', 'http://localhost:3000'];
// var corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log(origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

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

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.get('/chapters', async (req, res) => {
  let chapters = await db.select('*').from('chapters');

  res.json({ chapters });
});

// I do NOT know how to do this properly
app.get('/chhands-screen', async (req, res) => {
  let chapters = await db.select('*').from('chapters');

  for (let chapter of chapters) {
    let chhands = await db
      .select('*')
      .from('chhands')
      .where('chapter_id', chapter.id);

    for (let chhand of chhands) {
      let firstTuk = await db
        .select('*')
        .from('tuks')
        .where('line_number', 1)
        .first();

      let lastPauri = await db
        .select('*')
        .from('pauris')
        .where('chhand_id', chhand.id)
        .orderBy('number', 'ASC')
        .first();

      chhand.first_tuk = firstTuk;
      chhand.last_pauri = lastPauri;
    }
    chapter.chhands = chhands;
  }
  res.json({ chapters });
});

// Doing query params might get messy
app.get('/chapters/:id', async (req, res) => {
  const id = req.params.id;
  const chapter = await db.select('*').from('chapters').where('id', id).first();
  res.json({ chapter });
});

app.get('/chapters/:id/chhands', async (req, res) => {
  const chapterId = req.params.id;
  const chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId);
  res.json({ chhands });
});

// NOTE: This will never be public facing...
app.get('/chapters/:id/tuks', async (req, res) => {
  const chapterId = req.params.id;
  const chapter = await db
    .select('*')
    .from('chapters')
    .where('id', chapterId)
    .first();

  let chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId);

  for (let chhand of chhands) {
    let chhandType = await db
      .select('*')
      .from('chhand_types')
      .where('id', chhand.chhand_type_id)
      .first();

    let pauris =
      (await db.select('*').from('pauris').where('chhand_id', chhand.id)) || [];
    for (let pauri of pauris) {
      let tuks =
        (await db.select('*').from('tuks').where('pauri_id', pauri.id)) || [];
      pauri.tuks = tuks;
    }
    chhand.pauris = pauris;
    chhand.chhand_type = chhandType;
  }

  res.json({ chapter, chhands });
});

app.get('/chhands', async (req, res) => {
  const chhands = await db.select('*').from('chhands');
  res.json({ chhands });
});

app.get('/chhands/last', async (req, res) => {
  const lastChapterId = await db
    .select('*')
    .from('chapters')
    .max('order_number');

  console.log('0000000');
  console.log(lastChapterId);

  // const chhand = await db.select('*').from('chhands').last();
  res.json({ MESSAGE: 'OK' });
});

app.get('/chhand-types', async (req, res) => {
  const chhandTypes = await db.select('*').from('chhand_types');

  res.json({ chhand_types: chhandTypes });
});

app.post('/chhands/:id/pauris', async (req, res) => {
  console.log(req.body);
  const chhand = await db
    .select('*')
    .from('chhands')
    .where('id', req.params.id)
    .first();

  console.log(chhand);
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

  const tuk = await db('tuks').insert({
    ...req.body,
    pauri_id: 1,
    chhand_id: chhand.id,
    chhand_type_id: chhand.chhand_type_id,
    chapter_id: chhand.chapter_id,
  });
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log(tuk);
  res.json({ tuk });
  // Whitelist params

  res.json({ message: true });
});

const port = process.env.PORT || 1469;
app.listen(port, () => {
  console.log(`Listening @ http://localhost:${port}/`);
});
