import createDataContext from './createDataContext';
import { fetchGet } from '../helpers/fetchHelper';

const granthContext = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LAST':
      let _lastChapter;
      let _lastChhand;
      let _lastPauri;
      let _lastTuk;
      let _lastBook;
      _lastBook = action.payload.last_book?.id && action.payload.last_book;
      _lastChapter = _lastBook?.last_chapter?.id && _lastBook.last_chapter;
      _lastChhand = _lastChapter?.last_chhand?.id && _lastChapter.last_chhand;
      _lastPauri = _lastChhand?.last_pauri?.id && _lastChhand.last_pauri;
      _lastTuk = _lastPauri?.last_tuk?.id && _lastPauri.last_tuk;
      return {
        ...state,
        lastBook: _lastBook,
        lastChapter: _lastChapter,
        lastChhand: _lastChhand,
        lastPauri: _lastPauri,
        lastTuk: _lastTuk,
      };
    case 'UPDATE_ALL_BOOKS':
      return {
        ...state,
        allBooks: action.payload.allBooks,
      };
    case 'UPDATE_ALL_CHAPTERS':
      return {
        ...state,
        allChapters: action.payload.allChapters,
      };
    case 'UPDATE_ALL_CHAPTERS_FOR_BOOK':
      return {
        ...state,
        allChaptersForBook: action.payload.allChaptersForBook,
      };
    case 'UPDATE_CURRENT_BOOK':
      console.log(action.payload);
      console.log(action.payload.currentBook);
      return {
        ...state,
        currentBook: action.payload.currentBook,
      };

    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
};

const fetchSpgStatus = (dispatch) => async () => {
  try {
    const res = await fetchGet('/last');
    dispatch({ type: 'UPDATE_LAST', payload: res });
  } catch (error) {
    console.log(`⚠️ Error! ${console.error} in fetchSpgStatus().`);
  }
};

const fetchAllBooks = (dispatch) => async () => {
  const res = await fetchGet('/books');
  dispatch({ type: 'UPDATE_ALL_BOOKS', payload: { allBooks: res.books } });
};

const fetchAllChaptersForBookId = (dispatch) => async (bookId) => {
  const res = await fetchGet(`/chapters?book_id=${bookId}`);
  dispatch({
    type: 'UPDATE_ALL_CHAPTERS_FOR_BOOK',
    payload: { allChaptersForBook: res.chapters },
  });
};
const fetchAllChapters = (dispatch) => async () => {
  const res = await fetchGet('/chapters');
  dispatch({
    type: 'UPDATE_ALL_CHAPTERS',
    payload: { allChapters: res.chapters },
  });
};

const updateCurrentBook = (dispatch) => (book) => {
  dispatch({
    type: 'UPDATE_CURRENT_BOOK',
    payload: { currentBook: book },
  });
};

export const { Provider, Context } = createDataContext(
  granthContext,
  {
    fetchSpgStatus,
    fetchAllBooks,
    fetchAllChaptersForBookId,
    updateCurrentBook,
  },
  {
    lastBook: null,
    lastChapter: null,
    lastChhand: null,
    lastPauri: null,
    lastTuk: null,
    currentBook: null,
    allBooks: [],
    allChapters: [],
    allChaptersForBook: [],
  }
);
