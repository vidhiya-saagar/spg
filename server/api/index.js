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
  const chapters = await db.select('*').from('chapters');
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
  console.log(chapterId);
  const chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId);
  res.json({ chhands });
});

app.get('/chhands', async (req, res) => {
  const chhands = await db.select('*').from('chhands');
  res.json({ chhands });
});

app.get('/chhand_types', async (req, res) => {
  const chhandTypes = await db.select('*').from('chhand_types');
  res.json({ chhandTypes });
});

app.post('/chhand_types', async (req, res) => {
  const { chhand_name_unicode, chhand_name_english, chhand_name_gs } = req.body;
  if (isNewChhandType(chhand_name_english) === true) {
    const chhandTypes = await db.select('*').from('chhand_types');
    res.json({ chhandTypes });
  } else {
    res.json({
      message: 'This already an existing chhang_type in the database.',
    });
  }
});

app.get('/tuks', async (req, res) => {
  const tuks = await db.select('*').from('tuks');
  res.json({ tuks });
});

// @brief - A chapter should not have the same "order" of chhands
const chhandExistsInChapter = async (orderNumber, chapterId) => {
  const existingChhand = await db('chhands')
    .whereRaw('order_number = ?', orderNumber)
    .whereRaw('chapter_id = ?', chapterId);

  console.log(existingChhand);
  console.log(existingChhand.length > 0);

  return existingChhand.length > 0;
};

const isNewChhandType = async (chhandName) => {
  const existingChhandType = await db('chhand_types').whereRaw(
    'chhand_name_english = ?',
    chhandName
  );
  return existingChhandType.length === 0;
};

app.post('/chhands', async (req, res) => {
  const { order_number, chhand_name_english, chapter_id } = req.body;

  console.log(order_number);
  console.log(chhand_name_english);
  console.log(chapter_id);
  console.log('----------------------------------');

  if (chhand_name_english.length > 0) {
    if (isNewChhandType(chhand_name_english)) {
      db('chhand_types').insert({ chapter_id, chhand_name_english });
    }
    const chhand_type_id = await db('chhand_types')
      .whereRaw('chhand_name_english = ?', chhand_name_english)
      .first().id;

    console.log(chhand_type_id);
    // const chhand = await db('chhands').insert({
    //   order_number,
    //   chhand_name_english,
    //   chhand_type_id,
    //   chapter_id,
    // });
    let chhand = { id: 123, message: 'this is temp' };

    res.json({ chhand });
  }
});

app.post('/chhands/tuks', (req, res) => {});

const port = process.env.PORT || 1469;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
