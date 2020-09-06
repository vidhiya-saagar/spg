const db = require('../db');
const {
  isSafeParam,
  isGurmukhi,
} = require('../controllers/helpers/validations');
const { check, body, validationResult } = require('express-validator');
const {
  getLastBook,
  getLastChapter,
  getLastChhand,
  getlastPauriInChhand,
} = require('../controllers/helpers/queries');

const {
  getFormattedSignatureObj,
} = require('../controllers/helpers/dictionary');

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
        .where('chhand_id', chhand.id)
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

// POST `/chhands`
const createChhand = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  debugger;
  const lastChhand = await getLastChhand();
  const chhandType = await db
    .select('*')
    .from('chhand_types')
    .where('id', req.body.chhand_type_id)
    .first();

  const chhandId = await db('chhands').insert({
    order_number: req.body.order_number,
    chhand_name_english: chhandType.chhand_name_english,
    chhand_type_id: chhandType.id,
    chapter_id: lastChhand.chapter_id,
  });
  const chhand = await db('chhands').where('id', chhandId).first();

  res.status(200).json({ chhand });
};

// POST `/chhands/:id/pauris`
/** TODO:
 * Test for adding pauri to an existing chhand
 * Test for adding pauri to a new Chhand
 * Test for adding pauri to a new Chhand in NEW chapter
 * Test for adding pauri to a new Chhand in NEW chapter + book
 * Validation for invalid entries (null values, empty strings)
 * Validation for duplicate/similar tuks
 */
// TODO:
const createPauriInChhand = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const chhand = await db
    .select('*')
    .from('chhands')
    .where('id', req.params.id)
    .first();

  const lastPauri = await getlastPauriInChhand(chhand.id);
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
    req.body.pauri.map((tuk) => {
      return db('tuks').insert({
        ...tuk,
        chhand_id: chhand.id,
        chhand_type_id: chhand.chhand_type_id,
        chapter_id: chhand.chapter_id,
        pauri_id: pauri.id,
        vishraams: JSON.stringify(tuk.vishraams), /* NOTE: Knex cannot handle [] out the box */
        thamkis: JSON.stringify(tuk.thamkis), /* NOTE: Knex cannot handle [] out the box */
      });
    })
  )
    .then((val) => {
      debugger;
    })
    .catch((err) => {
      console.log(`⚠️ Error: ${err}`);
      debugger;
    });

  const tuks = await db
    .select('*')
    .from('tuks')
    .where('chhand_id', chhand.id)
    .where('pauri_id', pauri.id);

  pauri.tuks = tuks;

  res.json({ pauri });
};

const validateChhand = (action) => () => {
  switch (action) {
    case 'createChhand':
      return [
        body('chhand_type_id').isNumeric(),
        check(
          'chhand_type_id',
          'Chhand Type with that ID does not exist.'
        ).custom((id) => {
          return db
            .select('*')
            .from('chhand_types')
            .where('id', id)
            .first()
            .then((chhandType) => {
              return chhandType.id && chhandType.id > 0;
            });
        }),
        check('order_number', 'The order number is misaligned').custom(
          (orderNum) => {
            return getLastChhand().then((chhand) => {
              return orderNum === chhand.order_number + 1;
            });
          }
        ),
        // TODO: ALSO NOT WORKING. WHAT A SURPRISE...
        // check('order_number', 'The previous Chhand is empty.').custom(
        //   (orderNum) => {
        //     return getLastChhand().then((chhand) => {
        //       if (orderNum === 1) return true;
        //       return db
        //         .select('*')
        //         .from('pauris')
        //         .where('chhand_id', chhand.id)
        //         .limit(1)
        //         .then((pauris) => {
        //           return pauris.length > 0;
        //         });
        //     });
        //   }
        // ),

        // check(
        //   'chapter_id',
        //   'Chhand can only be added to the last chapter.'
        // ).custom((id) => {
        //   return db
        //     .select('*')
        //     .from('chapters')
        //     .where('id', id)
        //     .first()
        //     .then((chapter) => {
        //       chapter.id == getLastChapter().id &&
        //         chapter.book_id == getLastBook().id;
        //     });
        // }),
      ];
      break;
    case 'createPauriInChhand':
      return [
        // ===== CONTENT =====
        body('*.content_unicode').isInt(),
        // body('*.content_gs').isString(),
        // body('*.content_transliteration_english').isString(),
        // body('*.first_letters').isString(),
        // // ===== END OF CONTENT =====
        // // ===== VISHRAAM INFO =====
        // body('*.thamkis').isArray(),
        // body('*.thamkis').optional(),
        // body('*.vishraams').isArray(),
        // body('*.vishraams').optional(),
        // // ===== END OF VISHRAAM INFO =====
        // body('*.line_number').isInt(),
      ];
      break;

    default:
      break;
  }
};

module.exports = {
  chhandIndex,
  chhandScreen,
  createPauriInChhand,
  createChhand,
  validateChhand,
};
