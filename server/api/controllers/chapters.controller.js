const db = require('../db');
const { check, body, validationResult } = require('express-validator');
const {
  isSafeParam,
  isGurmukhi,
} = require('../controllers/helpers/validations');
const { getLastPauriInChapter, getLastChapter } = require('./helpers/queries');

/*
 * TODO: Separate these concerns:
 * Use controllers for only reading, parsing, validating input
 * Send complex, business logic, DB stuff to separate service
 */

const chapterQueryParams = async (chapters, query) => {
  console.log(`chapterQueryParams: ${query}`);

  for (let param of Object.keys(query)) {
    if (!isSafeParam('CHAPTERS', param)) return false;

    switch (param) {
      case 'number':
      case 'book_id':
        chapters.where(param, query[param]);
        break;
      case 'title_unicode':
      case 'title_gs':
      case 'title_transliteration_english':
        chapters.where(param, 'LIKE', `%${query[param]}%`);
        break;
      // NOTE: Will return immediately (no chaining)
      case 'last':
        const lastBookId = await db
          .select('id')
          .from('books')
          .orderBy('book_order', 'DESC')
          .first();
        return chapters
          .where('book_id', lastBookId)
          .orderBy('order_number', 'DESC')
          .limit(query.last);
        break;

      default:
        console.log(`⚠️ Something went wrong! ${param} was not recognized`);
        break;
    }
  }
};

// GET `/chapters`
const chaptersIndex = async (req, res) => {
  let chapters = db.select('*').from('chapters');
  if (Object.keys(req.query).length > 0) {
    chapterQueryParams(chapters, req.query); // Side Effect
  }
  res.json({ chapters: await chapters });
};

// POST `/chapters`
const createChapter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const lastChapter = await getLastChapter();
  const { title_unicode, title_gs, title_transliteration_english } = req.body;
  const chapterId = await db('chapters').insert({
    title_unicode,
    title_gs,
    title_transliteration_english,
    book_id: lastChapter.book_id,
    number: lastChapter.number + 1,
    order_number: lastChapter.order_number + 1,
  });
  const chapter = await db('chapters').where('id', chapterId).first();
  res.status(200).json({ chapter });
};

// GET `/chapters/:id`
const chapterFind = async (req, res) => {
  const id = req.params.id;
  const chapter = await db.select('*').from('chapters').where('id', id).first();
  res.status(200).json({ chapter });
};

// GET `/chapters/:id/chhands`
const chapterChhands = async (req, res) => {
  const chapterId = req.params.id;
  const chhands = db.select('*').from('chhands').where('chapter_id', chapterId);

  if (Object.keys(req.query).length > 0) {
    chhandQueryParams(chhands, req.query); // Side Effect
  }

  res.json({ chhands: await chhands });
};

// GET `/chapters/:id/tuks`
const chapterTuks = async (req, res) => {
  const chapterId = req.params.id;
  const chapter = await db
    .select('*')
    .from('chapters')
    .where('id', chapterId)
    .first();

  let chhands = await db
    .select('*')
    .from('chhands')
    .where('chapter_id', chapterId)
    .orderBy('order_number', 'ASC');

  for (let chhand of chhands) {
    let chhandType = await db
      .select('*')
      .from('chhand_types')
      .where('id', chhand.chhand_type_id)
      .first();

    let pauris =
      (await db
        .select('*')
        .from('pauris')
        .where('chhand_id', chhand.id)
        .orderBy('number', 'ASC')) || [];
    for (let pauri of pauris) {
      let tuks =
        (await db
          .select('*')
          .from('tuks')
          .where('pauri_id', pauri.id)
          .orderBy('line_number', 'ASC')) || [];
      pauri.tuks = tuks;
    }
    chhand.pauris = pauris;
    chhand.chhand_type = chhandType;
  }

  res.json({ chapter, chhands });
};

// GET `/chapters/:id/last-pauri`
const lastPauri = async (req, res) => {
  res.json({ last_pauri: await getLastPauriInChapter(req.params.id) });
};

// PUT `/chapters/:id/edit`
const editChapter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title_unicode, title_gs, title_transliteration_english } = req.body;

  const chapterId = await db('chapters')
    .update({
      title_unicode,
      title_gs,
      title_transliteration_english,
    })
    .where('id', req.params.id);

  const chapter = await db('chapters').where('id', chapterId).first();
  res.status(200).json({ chapter });
};

const validateChapter = (action) => {
  switch (action) {
    case 'createChapter':
      return [
        body('title_unicode').isString().not().isEmpty().trim(),
        body('title_unicode').custom(isGurmukhi),
        body('title_gs').isString().not().isEmpty().trim(),
        body('title_transliteration_english').isString().not().isEmpty().trim(),
        // Make sure this name doesn't exist already
        check('title_unicode').custom((unicode) => {
          return db
            .select('*')
            .from('chapters')
            .where('title_unicode', unicode)
            .first()
            .then((chhandType) => {
              if (chhandType) return Promise.reject('Chapter already exists');
            });
        }),
      ];
      break;
    case 'editChapter':
      return [
        body('title_unicode').isString().not().isEmpty().trim(),
        body('title_unicode').custom(isGurmukhi),
        body('title_gs').isString().not().isEmpty().trim(),
        body('title_transliteration_english').isString().not().isEmpty().trim(),
        // Make sure this name doesn't exist already
        // check('title_unicode').custom((unicode) => {
        //   return db
        //     .select('*')
        //     .from('chapters')
        //     .where('title_unicode', unicode);
        //   whereNotIn('id', req.params.id) // Will not work since I can't access req here
        //     .first()
        //     .then((chhandType) => {
        //       if (chhandType) return Promise.reject('Chapter already exists');
        //     });
        // }),
      ];
      break;

    default:
      break;
  }
};
module.exports = {
  chaptersIndex,
  createChapter,
  chapterFind,
  chapterChhands,
  chapterTuks,
  lastPauri,
  validateChapter,
  editChapter,
};
