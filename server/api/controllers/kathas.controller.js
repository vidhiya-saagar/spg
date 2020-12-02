const db = require('../db');
const { check, body, validationResult } = require('express-validator');

// POST `/kathas`
// Only creates the `kathas` record
const createKatha = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const kathaId = await db('kathas').insert({
    title: req.body.title,
    public_url: req.body.publicUrl,
    file_url: req.body.fileUrl,
  });
  const katha = await db('kathas').where('id', kathaId).first();

  res.status(200).json({ katha });
};

const getChapterKatha = async (req, res) => {
  let kathaIds = await db
    .select('katha_id')
    .from('chapter_kathas')
    .where('chapter_id', req.params.id);

  kathaIds = kathaIds.map((row) => parseInt(row.katha_id));
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log(kathaIds);
  const kathas = await db('kathas').whereIn('id', kathaIds);

  res.status(200).json({ kathas });
};

// POST `/chapters/:id/kathas`
// This is will create a `kathas` record AND the `chapter_kathas` relationship
const createChapterKatha = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const kathaId = await db('kathas').insert({
    title: req.body.title,
    public_url: req.body.publicUrl,
    file_url: req.body.fileUrl,
  });

  const chapterKathaId = await db('chapter_kathas').insert({
    katha_id: kathaId,
    chapter_id: req.params.id,
  });

  const chapterKatha = await db('chapter_kathas')
    .where('id', chapterKathaId)
    .first();
  const chapter = await db('chapters')
    .where('id', chapterKatha.chapter_id)
    .first();
  const katha = await db('kathas').where('id', chapterKatha.katha_id).first();

  res.status(200).json({ chapter_katha: chapterKatha, chapter, katha });
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

module.exports = {
  createKatha,
  getChapterKatha,
  createChapterKatha,
  validateKatha,
};
