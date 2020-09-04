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

  const chhandType = db('chhand-types').insert({ ...req.body });

  res.json({ errors, chhand_type: chhandType });
};

const validateChhandType = (action) => {
  switch (action) {
    case 'createChhandType':
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
