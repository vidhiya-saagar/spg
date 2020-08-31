const db = require('../db');

// @brief: For endpoints that apply to the entire application

/*
 * LAST generally means the absolutely last `tuk` and the parent
 * Admin needs a way to get the last `tuk`, `pauri`, etc. to maintain order
 * It is too cumbersome to try get the "LAST" individually
  
  lastbook: {
    lastChapter: {
      lastChhand: {
        lastPauri: {
          lastTuk: {}
        }
      }
    }
  }
 */

// GET `/last`
const last = async (req, res) => {
  let json = {};
  let lastBook = null;
  let lastChapter = null;
  let lastChhand = null;
  let chhandType = null;
  let lastPauri = null;
  let lastTuk = null;

  // Cannot be FALSY
  lastBook = await db
    .select('*')
    .from('books')
    .orderBy('book_order', 'DESC')
    .first();

  json.last_book = lastBook;

  lastChapter = await db
    .select('*')
    .from('chapters')
    .where('book_id', lastBook.id)
    .orderBy('order_number', 'DESC')
    .first();

  if (lastChapter) {
    json.last_book.last_chapter = lastChapter;

    lastChhand = await db
      .select('*')
      .from('chhands')
      .where('chapter_id', lastChapter.id)
      .orderBy('order_number', 'DESC')
      .first();
  }

  if (lastChhand) {
    json.last_book.last_chapter.last_chhand = lastChhand;

    chhandType = await db
      .select('*')
      .from('chhand_types')
      .where('id', lastChhand.chhand_type_id)
      .first();

    lastPauri = await db
      .select('*')
      .from('pauris')
      .where('chhand_id', lastChhand.id)
      .orderBy('number', 'DESC')
      .first();
  }

  if (lastPauri) {
    json.last_book.last_chapter.last_chhand.chhand_type = chhandType;
    json.last_book.last_chapter.last_chhand.last_pauri = lastPauri;

    lastTuk = await db
      .select('*')
      .from('tuks')
      .where('pauri_id', lastPauri.id)
      .orderBy('line_number', 'DESC')
      .first();
  }

  if (lastTuk) {
    json.last_book.last_chapter.last_chhand.last_pauri.last_tuk = lastTuk;
  }

  res.json(json);
};

module.exports = { last };
