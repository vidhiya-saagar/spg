const express = require('express');

const {
  chapterIndex,
  chapterFind,
  chapterChhands,
  chapterTuks,
} = require('../controllers/chapters.controller');

const { chhandTypeIndex } = require('../controllers/chhandTypes.controller');

const {
  chhandIndex,
  chhandScreen,
  createPauriInChhand,
} = require('../controllers/chhands.controller');

const router = express.Router();

// chapters
router.get('/chapters', chapterIndex);
router.get('/chapters/:id', chapterFind);
router.get('/chapters/:id/chhands', chapterChhands);
router.get('/chapters/:id/tuks', chapterTuks);

// chhand_types
router.get('/chhand-types', chhandTypeIndex);

// chhands
router.get('/chhands', chhandIndex);
router.get('/chhands-screen', chhandScreen);
router.post('/chhands/:id/pauris', createPauriInChhand);

module.exports = router;
