const db = require('../../db');

const getLastBook = async () => {
  return await db
    .select('*')
    .from('books')
    .orderBy('book_order', 'DESC')
    .first();
};

const getLastChapter = async () => {
  const lastBook = await getLastBook();
  if (!lastBook) return null;
  return await db
    .select('*')
    .from('chapters')
    .where('book_id', lastBook.id)
    .orderBy('order_number', 'DESC')
    .first();
};

const getLastChhand = async () => {
  const lastChapter = await getLastChapter();
  if (!lastChapter) return null;
  return await db
    .select('*')
    .from('chhands')
    .where('chapter_id', lastChapter.id)
    .orderBy('order_number', 'DESC')
    .first();
};

const getlastPauriInChapter = async (chapterId) => {
  if (!chapterId) return null;
  return await db
    .select('*')
    .from('pauris')
    .where('chapter_id', chapterId)
    .orderBy('number', 'DESC')
    .first();
};

module.exports = {
  getLastBook,
  getLastChapter,
  getLastChhand,
  getlastPauriInChapter,
};
