const db = require('../db');
const {
  isSafeParam,
  isGurmukhi,
} = require('../controllers/helpers/validations');
const { check, body, validationResult } = require('express-validator');
const { getLastPauriInChapter } = require('./helpers/queries');
const {
  getFormattedSignatureObj,
} = require('../controllers/helpers/dictionary');

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

// POST `/pauris`
const createPauri = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const chhand = await db
    .select('*')
    .from('chhands')
    .where('id', req.body.chhand_id)
    .first();

  const lastPauri = await getLastPauriInChapter(chhand.chapter_id);
  const nextPauriNumber = lastPauri ? lastPauri.number + 1 : 1;
  const pauriId = await db('pauris').insert({
    number: nextPauriNumber,
    ...getFormattedSignatureObj(nextPauriNumber),
    chapter_id: chhand.chapter_id,
    chhand_id: chhand.id,
  });

  const pauri = await db
    .select('*')
    .from('pauris')
    .where('id', pauriId)
    .first();

  // prettier-ignore
  Promise.all(
    req.body.pauri.map((_tuk) => {
      return db('tuks').insert({
        ..._tuk,
        chhand_id: chhand.id,
        chhand_type_id: chhand.chhand_type_id,
        chapter_id: chhand.chapter_id,
        pauri_id: pauri.id,
        vishraams: JSON.stringify(_tuk.vishraams), /* NOTE: Knex cannot handle [] out the box */
        thamkis: JSON.stringify(_tuk.thamkis), /* NOTE: Knex cannot handle [] out the box */
      });
    })
  )
    .then((val) => {
      // TODO: Figure out if I need to put my res.json() in here
    })
    .catch((err) => {
      console.log(`⚠️ Error: ${err}`);
    });

  const tuks = await db
    .select('*')
    .from('tuks')
    .where('chhand_id', chhand.id)
    .where('pauri_id', pauri.id);

  pauri.tuks = tuks;
  res.status(200).json({ pauri });
};

const editPauri = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const pauri = await db
    .select('*')
    .from('pauris')
    .where('id', req.params.id)
    .first();

  let chhandTypeId;

  await Promise.all(
    req.body.pauri.map(async (_tuk) => {
      const tuk = await db
        .select('*')
        .from('tuks')
        .where('pauri_id', pauri.id)
        .where('line_number', _tuk.line_number)
        .first();

      if (tuk) {
        // UPDATE TUK
        return await tuk.update({
          ..._tuk,
          vishraams: JSON.stringify(_tuk.vishraams),
          thamkis: JSON.stringify(_tuk.thamkis),
        });
      } else {
        // INSERT NEW TUK
        if (!chhandTypeId) {
          chhandTypeId = await db
            .select('chhand_type_id')
            .from('chhands')
            .where('id', pauri.chhand_id)
            .first();
          // omg this is so bad
          chhandTypeId = chhandTypeId.chhand_type_id;
        }
        const tt = await db('tuks').insert({
          ..._tuk,
          chhand_id: pauri.chhand_id,
          chhand_type_id: chhandTypeId,
          chapter_id: pauri.chapter_id,
          pauri_id: pauri.id,
          vishraams: JSON.stringify(_tuk.vishraams),
          thamkis: JSON.stringify(_tuk.thamkis),
        });
      }
    })
  )
    .then((val) => {
      // TODO: Figure out if I need to put my res.json() in here
    })
    .catch((err) => {
      console.log(`⚠️ Error: ${err}`);
    });

  const tuks = await db.select('*').from('tuks').where('pauri_id', pauri.id);
  pauri.tuks = tuks;
  res.status(200).json({ pauri });
};

// VALIDATIONS
const validatePauri = (action) => {
  switch (action) {
    case 'createPauri':
      // prettier-ignore
      return [
        // ===== CONTENT =====
        body('pauri.*.content_unicode').isString().not().isEmpty().trim(),
        body('pauri.*.content_unicode').custom(isGurmukhi),
        body('pauri.*.content_gs').isString().not().isEmpty().trim(),
        body('pauri.*.content_transliteration_english').isString().not().isEmpty().trim(),
        body('pauri.*.first_letters').isString().not().isEmpty().trim(),
        // ===== END OF CONTENT =====
        // ===== VISHRAAM INFO =====
        // body('pauri.*.thamkis').isArray(),
        // body('pauri.*.thamkis').optional(),
        // body('pauri.*.vishraams').isArray(),
        // body('pauri.*.vishraams').optional(),
        // ===== END OF VISHRAAM INFO =====
        body('pauri.*.line_number').isInt(),
        // Make sure this name doesn't exist already
        check('pauri.*.content_unicode').custom((unicode) => {
          return db
            .select('*')
            .from('tuks')
            .where('content_unicode', unicode)
            .first()
            .then((tuk) => {
              if (tuk) {
                return Promise.reject({
                  message: 'This tuk may already exist',
                  tuk,
                });
              }
            });
        }),
      ];
      break;

    case 'editPauri':
      // prettier-ignore
      return [
          // ===== CONTENT =====
          body('pauri.*.content_unicode').isString().not().isEmpty().trim(),
          body('pauri.*.content_unicode').custom(isGurmukhi),
          body('pauri.*.content_gs').isString().not().isEmpty().trim(),
          body('pauri.*.content_transliteration_english').isString().not().isEmpty().trim(),
          body('pauri.*.first_letters').isString().not().isEmpty().trim(),
          // ===== END OF CONTENT =====
          // ===== VISHRAAM INFO =====
          // body('pauri.*.thamkis').isArray(),
          // body('pauri.*.thamkis').optional(),
          // body('pauri.*.vishraams').isArray(),
          // body('pauri.*.vishraams').optional(),
          // ===== END OF VISHRAAM INFO =====
          body('pauri.*.line_number').isInt(),
        ];
      break;

    default:
      break;
  }
};

module.exports = {
  pauriIndex,
  showFullPauri,
  createPauri,
  editPauri,
  validatePauri,
};
