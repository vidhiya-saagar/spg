const db = require('../db');

// GET `/chhands`
const chhandIndex = async (req, res) => {
  const chhands = await db.select('*').from('chhands');
  res.json({ chhands });
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
        .orderBy('number', 'ASC')
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
