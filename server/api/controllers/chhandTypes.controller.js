const db = require('../db');
const { check, body, validationResult } = require('express-validator');
const { isGurmukhi } = require('../controllers/helpers/validations');
// GET `/chhand-types`
const chhandTypeIndex = async (req, res) => {
  const chhandTypes = await db.select('*').from('chhand_types');
  res.json({ chhand_types: chhandTypes });
};

// POST `/chhand-types`
const createChhandType = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const chhandTypeId = await db('chhand_types').insert({ ...req.body });
  const chhandType = await db('chhand_types').where('id', chhandTypeId).first();

  res.status(200).json({ chhand_type: chhandType });
};

const validateChhandType = (action) => {
  switch (action) {
    case 'createChhandType':
      // Make sure this name doesn't exist already
      return [
        body('chhand_name_unicode').isString(),
        body('chhand_name_unicode').custom(isGurmukhi),
        body('chhand_name_english').isString(),
        body('chhand_name_gs').isString(),
        // TODO: Does this work? You guessed it! NOPE! Why? I'll pay $100 for a good reason why
        // check(
        //   'chhand_name_unicode',
        //   'Chhand already exists in the database'
        // ).custom((unicode) => {
        //   return db
        //     .select('*')
        //     .from('chhand_types')
        //     .where('chhand_name_unicode', unicode)
        //     .first()
        //     .then((chhandType) => {
        //       // If this exists, then prevent it from going to the controller
        //       // return typeof chhandType === 'undefined';
        //       return false;
        //     });
        // }),
      ];
      break;

    default:
      break;
  }
};

module.exports = { chhandTypeIndex, createChhandType, validateChhandType };
