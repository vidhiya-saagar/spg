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

const { pauriIndex } = require('../controllers/pauris.controller');

const { last } = require('../controllers/application.controller');

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

// pauris
router.get('/pauris', pauriIndex);

// APPLICATIONS
router.get('/last', last);

module.exports = router;
