const db = require('../db');

// GET `/chhand-types`
const chhandTypeIndex = async (req, res) => {
  const chhandTypes = await db.select('*').from('chhand_types');
  res.json({ chhand_types: chhandTypes });
};

module.exports = { chhandTypeIndex };
