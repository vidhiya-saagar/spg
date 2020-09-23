const db = require('../db');
const { isSafeParam } = require('../controllers/helpers/validations');
const { getLastPauriInChapter } = require('./helpers/queries');
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

// GET `/chapters/:id`
const chapterFind = async (req, res) => {
  const id = req.params.id;
  const chapter = await db.select('*').from('chapters').where('id', id).first();
  res.json({ chapter });
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
    .where('chapter_id', chapterId);

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

module.exports = {
  chaptersIndex,
  chapterFind,
  chapterChhands,
  chapterTuks,
  lastPauri,
};
