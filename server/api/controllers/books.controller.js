const db = require('../db');
const { isSafeParam } = require('../controllers/helpers/validations');

const bookQueryParams = async (books, query) => {
  console.log(`bookQueryParams: ${query}`);

  for (let param of Object.keys(query)) {
    if (!isSafeParam('BOOKS', param)) return false;

    switch (param) {
      case 'book_order':
        books.where(param, query[param]);
        break;
      default:
        console.log(`⚠️ Something went wrong! ${param} was not recognized`);
        break;
    }
  }
};

// GET `/books`
const booksIndex = async (req, res) => {
  let books = db.select('*').from('books');
  if (Object.keys(req.query).length > 0) {
    bookQueryParams(books, req.query); // Side Effect
  }
  res.status(200).json({ books: await books });
};

// GET `/books/:id/chapters`
const bookChapters = async (req, res) => {
  const chapters = await db
    .select('*')
    .from('chapters')
    .where('book_id', req.params.id)
    .orderBy('number', 'ASC');
  res.status(200).json({ chapters });
};

module.exports = {
  booksIndex,
  bookChapters,
};
