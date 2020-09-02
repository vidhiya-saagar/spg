import createDataContext from './createDataContext';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';

const formReducer = (state, action) => {
  const index = state.tukForm.findIndex(
    (tuk) => tuk.tukNumber === action.payload.tukNumber
  );

  switch (action.type) {
    case 'UPDATE_FORM_ITEM':
      return updateTukForm(index, state, {
        ...state.tukForm[index],
        unicode: action.payload.unicode,
        unicodeVishraam: action.payload.unicodeVishraam,
        gurmukhiScript: action.payload.gurmukhiScript,
      });

    case 'UPDATE_UNICODE_RAW':
      return updateTukForm(index, state, {
        unicodeRaw: action.payload.unicodeRaw,
        unicode: action.payload.unicode,
        unicodeVishraam: action.payload.unicodeVishraam,
        gurmukhiScript: action.payload.gurmukhiScript,
        englishTranslit: action.payload.englishTranslit,
        firstLetters: action.payload.firstLetters,
        thamki: action.payload.thamki,
        vishraam: action.payload.vishraam,
        tukNumber: action.payload.tukNumber,
      });

    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
};

const updateTukForm = (index, oldState, newState) => {
  return {
    ...oldState,
    tukForm: [
      ...oldState.tukForm.slice(0, index), // everything before current post
      { ...oldState.tukForm[index], ...newState },
      ...oldState.tukForm.slice(index + 1), // everything after current post
    ],
  };
};

const findWordIndiciesWith = (str, char) => {
  const words = str.split(' ');
  const arr = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word[word.length - 1] === char) {
      arr.push(i);
    }
  }
  return arr;
};

const handleLineBreaks = (str) => str.trim().replace(/\r?\n|\r/g, '; ');
const removeSpecialChars = (str) => str.replace(/[,.';]/g, '');
const keepVishraams = (str) => str.replace(/[.']/g, '');

// When unicodeRaw changes
const updateUnicodeRaw = (dispatch) => (unicodeRaw, tukNumber) => {
  const unicodeRawSafe = handleLineBreaks(unicodeRaw);
  const unicodeSafe = removeSpecialChars(unicodeRawSafe);
  const _gurmukhiScript = anvaad.unicode(unicodeSafe, true);

  const payload = {
    unicodeRaw: unicodeRawSafe,
    unicode: unicodeSafe,
    unicodeVishraam: keepVishraams(unicodeRawSafe),
    gurmukhiScript: _gurmukhiScript,
    englishTranslit: anvaad.translit(_gurmukhiScript),
    firstLetters: anvaad.firstLetters(unicodeSafe),
    thamki: findWordIndiciesWith(unicodeRawSafe, ','),
    vishraam: findWordIndiciesWith(unicodeRawSafe, ';'),
    tukNumber,
  };
  dispatch({ type: 'UPDATE_UNICODE_RAW', payload });
};

// When unicode/gurmukhiScript/unicodeVishraam changes
const updateFormItem = (dispatch) => (formItem) => {
  dispatch({ type: 'UPDATE_FORM_ITEM', payload: formItem });
};

export const { Provider, Context } = createDataContext(
  formReducer,
  {
    updateFormItem,
    updateUnicodeRaw,
  },
  {
    tukForm: [
      {
        unicodeRaw: '',
        unicode: '',
        unicodeVishraam: '',
        thamki: [],
        vishraam: [],
        gurmukhiScript: '',
        englishTranslit: '',
        firstLetters: '',
        tukNumber: 1,
      },
    ],
  }
);
