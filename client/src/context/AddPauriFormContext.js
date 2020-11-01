import { useContext } from 'react';
import createDataContext from './createDataContext';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';
import { hasSpaceBeforePeriod } from '../helpers/validationHelper';

const formReducer = (state, action) => {
  let index;
  switch (action.type) {
    case 'UPDATE_FORM_ITEM':
      index = findTukIndex(state, action.payload.tukNumber);
      // prettier-ignore
      return updateTukForm(index, state, {
        ...state.tukForm[index],
          unicode: action.payload.unicode || state.tukForm[index].unicode,
          unicodeVishraam: action.payload.unicodeVishraam || state.tukForm[index].unicodeVishraam,
          gurmukhiScript: action.payload.gurmukhiScript || state.tukForm[index].gurmukhiScript,
      });

    case 'UPDATE_UNICODE_RAW':
      index = findTukIndex(state, action.payload.tukNumber);
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

    case 'UPDATE_UNICODE':
      index = findTukIndex(state, action.payload.tukNumber);
      return updateTukForm(index, state, {
        unicode: action.payload.unicode,
        gurmukhiScript: action.payload.gurmukhiScript,
        englishTranslit: action.payload.englishTranslit,
        tukNumber: action.payload.tukNumber,
      });

    case 'ADD_TUK_FORM':
      index = state.tukForm.length + 1;
      return updateTukForm(index, state, {
        unicodeRaw: '',
        unicode: '',
        unicodeVishraam: '',
        gurmukhiScript: '',
        englishTranslit: '',
        firstLetters: '',
        thamki: [],
        vishraam: [],
        tukNumber: state.tukForm[state.tukForm.length - 1].tukNumber + 1,
      });

    case 'REMOVE_LAST_TUK_FORM':
      return {
        ...state,
        tukForm: [...state.tukForm.slice(0, -1)],
      };
    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
};

const findTukIndex = (state, tukNumber) => {
  return state.tukForm.findIndex((t) => t.tukNumber === tukNumber);
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

const replaceQuotationMarksWithBindi = (str) => str.trim().replace("'", 'ਂ');
const handleLineBreaks = (str) => str.trim().replace(/\r?\n|\r/g, ' ');
const handleHalfYayya = (str) => str.trim().replace('ਜਯੋ', '੍ਯੋ');

const handleUnicodeRaw = (str) => {
  // str = replaceQuotationMarksWithBindi(str);

  str = keepVishraamChars(str);
  str = str.trim();
  // replaceQuotationMarksWithBindi(replaceSpecialCharacters(unicodeRaw))
  // );

  if (!hasSpaceBeforePeriod(str)) {
    str = str.slice(0, str.length - 1) + ` ${str[str.length - 1]}`;
  }
  str = handleHalfYayya(str);
  // return str;
  return handleLineBreaks(str);
};

const removeAllSpecialChars = (str) => str.replace(/[,.'”“"*;?-_]/g, '');
const keepVishraamChars = (str) => str.replace(/[.'”“"*?-_?]/g, '');

// When unicodeRaw changes
const updateUnicodeRaw = (dispatch) => (unicodeRaw, tukNumber) => {
  const unicodeRawSafe = handleUnicodeRaw(unicodeRaw);
  const unicodeSafe = removeAllSpecialChars(unicodeRawSafe);
  const _gurmukhiScript = anvaad.unicode(unicodeSafe, true);

  const payload = {
    unicodeRaw: unicodeRawSafe,
    unicode: unicodeSafe,
    gurmukhiScript: _gurmukhiScript,
    englishTranslit: anvaad.translit(_gurmukhiScript),
    firstLetters: anvaad.firstLetters(unicodeSafe),
    thamki: findWordIndiciesWith(unicodeRawSafe, ','),
    vishraam: findWordIndiciesWith(unicodeRawSafe, ';'),
    tukNumber,
  };
  dispatch({ type: 'UPDATE_UNICODE_RAW', payload });
};

const updateUnicode = (dispatch) => (unicode, tukNumber) => {
  const _gurmukhiScript = anvaad.unicode(unicode, true);

  const payload = {
    unicode: unicode,
    gurmukhiScript: _gurmukhiScript,
    englishTranslit: anvaad.translit(_gurmukhiScript),
    tukNumber,
  };
  dispatch({ type: 'UPDATE_UNICODE', payload });
};

// When unicode/gurmukhiScript/unicodeVishraam changes
const updateFormItem = (dispatch) => (formItem) => {
  dispatch({ type: 'UPDATE_FORM_ITEM', payload: formItem });
};

const addTukForm = (dispatch) => () => {
  dispatch({ type: 'ADD_TUK_FORM' });
};

const removeLastTukForm = (dispatch) => () => {
  dispatch({ type: 'REMOVE_LAST_TUK_FORM' });
};

export const { Provider, Context } = createDataContext(
  formReducer,
  {
    updateFormItem,
    updateUnicodeRaw,
    updateUnicode,
    addTukForm,
    removeLastTukForm,
  },
  {
    tukForm: [
      {
        unicodeRaw: '',
        unicode: '',
        unicodeVishraam: '',
        gurmukhiScript: '',
        englishTranslit: '',
        firstLetters: '',
        thamki: [],
        vishraam: [],
        tukNumber: 1,
      },
    ],
  }
);
