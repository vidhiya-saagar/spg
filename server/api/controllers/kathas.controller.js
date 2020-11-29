const db = require('../db');
const { check, body, validationResult } = require('express-validator');

// POST `/kathas`
const createKatha = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  debugger;
  const kathaId = await db('kathas').insert({
    title: req.body.title,
    public_url: req.body.publicUrl,
    file_url: req.body.fileUrl,
  });
  const katha = await db('kathas').where('id', kathaId).first();

  res.status(200).json({ katha });
};

// POST `/chapters/:id/kathas`
const createChapterKatha = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  debugger;
  const kathaId = await db('kathas').insert({
    title: req.body.title,
    public_url: req.body.publicUrl,
    file_url: req.body.fileUrl,
  });
  const katha = await db('kathas').where('id', kathaId).first();

  res.status(200).json({ katha });
};

const validateKatha = (action) => {
  switch (action) {
    case 'createKatha':
    case 'createChapterKatha':
      return [
        body('file').exists(),
        body('publicUrl').isString().not().isEmpty().trim(),
      ];
      break;

    default:
      break;
  }
};

module.exports = { createKatha, createChapterKatha, validateKatha };
