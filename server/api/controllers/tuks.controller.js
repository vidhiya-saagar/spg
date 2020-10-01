const db = require('../db');
const { check, body, validationResult } = require('express-validator');

// DELETE `/tuk/:id`
const deleteTuk = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  db('tuks')
    .where('id', req.params.id)
    .first()
    .del()
    .then(() => {
      res.status(204).json({
        _deleted: tuk,
      });
    })
    .error((err) => {
      res.send({
        error: err,
        message: 'Tuk could not be deleted.',
      });
    });
};

const validateTuk = (action) => {
  switch (action) {
    case 'deleteTuk':
      return [
        body('id').isNumeric().not().isEmpty(),
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
