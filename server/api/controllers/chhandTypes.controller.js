const db = require('../db');
const { body, validationResult } = require('express-validator');
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
      ];
      break;

    default:
      break;
  }
};

module.exports = { chhandTypeIndex, createChhandType, validateChhandType };
