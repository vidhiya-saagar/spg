const db = require('../db');

const { isSafeParam } = require('../controllers/helpers/validations');

const pauriQueryParams = async (pauris, query) => {
  console.log(`pauriQueryParams: ${query}`);

  for (let param of Object.keys(query)) {
    if (!isSafeParam('PAURIS', param)) return false;

    switch (param) {
      case 'id':
      case 'number':
      case 'chhand_id':
      case 'chapter_id':
      case 'first_tuk_id':
      case 'last_tuk_id':
        pauris.where(param, query[param]);
        break;
      default:
        console.log(`⚠️ Something went wrong! ${param} was not recognized`);
        break;
    }
  }
};

// GET `/pauris`
const pauriIndex = async (req, res) => {
  const pauris = db.select('*').from('pauris');
  if (Object.keys(req.query).length > 0) {
    pauriQueryParams(pauris, req.query); // Side Effect
  }

  res.json({ pauris: await pauris });
};

// get `pauri/:id/full
const showFullPauri = async (req, res) => {
  const pauri = await db
    .select('*')
    .from('pauris')
    .where('id', req.params.id)
    .first();

  if (!pauri) return res.json({ pauri });

  const chapter = await db
    .select('*')
    .from('chapters')
    .where('id', pauri.chapter_id)
    .first();

  const chhand = await db
    .select('*')
    .from('chhands')
    .where('id', pauri.chhand_id)
    .first();

  const tuks = await db
    .select('*')
    .from('tuks')
    .where('pauri_id', pauri.id)
    .orderBy('line_number', 'ASC');
  pauri.tuks = tuks;

  res.status(200).json({ pauri, chapter, chhand });
};

module.exports = { pauriIndex, showFullPauri };
