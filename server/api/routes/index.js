const express = require('express');

const { booksIndex, bookChapters } = require('../controllers/books.controller');

const {
  chaptersIndex,
  chapterFind,
  chapterChhands,
  chapterTuks,
  lastPauri,
} = require('../controllers/chapters.controller');

const {
  chhandTypeIndex,
  createChhandType,
  validateChhandType,
} = require('../controllers/chhandTypes.controller');

const {
  chhandIndex,
  createChhand,
  chhandScreen,
  createPauriInChhand,
  validateChhand,
} = require('../controllers/chhands.controller');

const { pauriIndex } = require('../controllers/pauris.controller');

const { last } = require('../controllers/application.controller');

const router = express.Router();

// books
router.get('/books', booksIndex);
router.get('/books/:id/chapters', bookChapters);

// chapters
router.get('/chapters', chaptersIndex);
router.get('/chapters/:id', chapterFind);
router.get('/chapters/:id/chhands', chapterChhands);
router.get('/chapters/:id/tuks', chapterTuks);
router.get('/chapters/:id/last-pauri', lastPauri);

// chhand_types
router.get('/chhand-types', chhandTypeIndex);
router.post(
  '/chhand-types',
  validateChhandType('createChhandType'),
  createChhandType
);

// chhands
router.get('/chhands', chhandIndex);
router.post('/chhands', validateChhand('createChhand'), createChhand);
router.get('/chhands-screen', chhandScreen);
router.post(
  '/chhands/:id/pauris',
  validateChhand('createPauriInChhand'),
  createPauriInChhand
);

// pauris
router.get('/pauris', pauriIndex);

// APPLICATIONS
router.get('/last', last);

module.exports = router;
