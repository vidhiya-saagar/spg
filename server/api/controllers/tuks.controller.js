const db = require('../db');
const { check, param, validationResult } = require('express-validator');

// DELETE `/tuk/:id`
const deleteTuk = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const _deleted = await db('tuks').where('id', req.params.id).first().del();
    return res.json({
      id: req.params.id,
      _deleted: _deleted,
    });
  } catch (error) {
    return res.send({
      error,
      message: 'Tuk could not be deleted.',
    });
  }
};

const validateTuk = (action) => {
  switch (action) {
    case 'deleteTuk':
      return [
        param('id').not().isEmpty(),
        // Make sure this Tuk doesn't exist already
        check('id').custom((id) => {
          return db
            .select('*')
            .from('tuks')
            .where('id', id)
            .first()
            .then((tuk) => {
              if (!tuk) return Promise.reject('Tuk does not exist!');
            });
        }),
      ];
  }
};

module.exports = {
  deleteTuk,
  validateTuk,
};
