const db = require('../db');
const { isSafeParam } = require('../controllers/helpers/validations');

const chhandQueryParams = async (chhands, query) => {
  console.log(`chhandQueryParams: ${query}`);

  for (let param of Object.keys(query)) {
    if (!isSafeParam('CHHANDS', param)) return false;

    switch (param) {
      case 'order_number':
      case 'chhand_type_id':
      case 'chapter_id':
        chhands.where(param, query[param]);
        break;
      case 'chhand_name_english':
        chhands.where(param, 'LIKE', `%${query[param]}%`);
        break;
      case 'last':
        const lastBookId = await db
          .select('id')
          .from('books')
          .orderBy('book_order', 'DESC')
          .first();
        const lastChapterId = await db
          .select('id')
          .from('chapters')
          .where('book_id', lastBookId)
          .orderBy('order_number', 'DESC')
          .first();

        return chhands
          .where('chapter_id', lastChapterId)
          .orderBy('order_number', 'DESC')
          .limit(query.last);

        break;

      default:
        console.log(`⚠️ Something went wrong! ${param} was not recognized`);
        break;
    }
  }
};

// GET `/chhands`
const chhandIndex = async (req, res) => {
  const chhands = db.select('*').from('chhands');
  if (Object.keys(req.query).length > 0) {
    chhandQueryParams(chhands, req.query); // Side Effect
  }

  res.json({ chhands: await chhands });
};

// TODO: Refactor later... This route makes no sense
// GET `/chhands-screen`
const chhandScreen = async (req, res) => {
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
        .orderBy('number', 'DESC')
        .first();

      chhand.first_tuk = firstTuk;
      chhand.last_pauri = lastPauri;
    }
    chapter.chhands = chhands;
  }
  res.json({ chapters });
};

// TODO: This is not complete
// POST `/chhands/:id/pauris`
const createPauriInChhand = async (req, res) => {
  const chhand = await db
    .select('*')
    .from('chhands')
    .where('id', req.params.id)
    .first();

  const tuk = await db('tuks').insert({
    ...req.body,
    pauri_id: 1,
    chhand_id: chhand.id,
    chhand_type_id: chhand.chhand_type_id,
    chapter_id: chhand.chapter_id,
  });
  res.json({ tuk });
  // Whitelist params

  res.json({ message: true });
};

module.exports = { chhandIndex, chhandScreen, createPauriInChhand };
