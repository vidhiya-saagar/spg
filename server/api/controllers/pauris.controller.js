const db = require('../db');

const { isSafeParam } = require('../controllers/helpers/validations');

const pauriQueryParams = async (pauris, query) => {
  console.log(`pauriQueryParams: ${query}`);

  for (let param of Object.keys(query)) {
    if (!isSafeParam('PAURIS', param)) return false;

    switch (param) {
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

module.exports = { pauriIndex };
