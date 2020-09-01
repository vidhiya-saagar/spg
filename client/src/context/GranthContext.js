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
    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
};

const getSpgStatus = (dispatch) => async () => {
  try {
    const res = await fetchGet('/last');
    dispatch({ type: 'UPDATE_LAST', payload: res });
  } catch (error) {
    console.log(`⚠️ Error! ${console.error} in getSpgStatus().`);
  }
};

export const { Provider, Context } = createDataContext(
  granthContext,
  {
    getSpgStatus,
  },
  {
    lastBook: null,
    lastChapter: null,
    lastChhand: null,
    lastPauri: null,
    lastTuk: null,
  }
);
