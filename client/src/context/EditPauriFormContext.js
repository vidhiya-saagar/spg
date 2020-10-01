import { useContext } from 'react';
import createDataContext from './createDataContext';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';
import { hasSpaceBeforePeriod } from '../helpers/validationHelper';

const formReducer = (state, action) => {
  let index;
  switch (action.type) {
    case 'POPULATE_TUK':
      const tuk = action.payload;
      const newState = {
        id: tuk.id,
        unicodeRaw: generateUnicodeRaw(
          tuk.content_unicode,
          tuk.vishraams,
          tuk.thamkis
        ),
        unicode: tuk.content_unicode,
        gurmukhiScript: tuk.content_gs,
        englishTranslit: tuk.content_transliteration_english,
        firstLetters: tuk.first_letters,
        thamki: tuk.thamkis,
        vishraam: tuk.vishraams,
        tukNumber: tuk.line_number,
      };
      return updateOriginalTukForm(tuk.line_number - 1, state, newState);
      // return updateTukForm(tuk.line_number - 1, state, newState);
      break;

    case 'UPDATE_FORM_ITEM':
      index = findTukIndex(state, action.payload.tukNumber);
      // prettier-ignore
      return updateTukForm(index, state, {
        ...state.tukForm[index],
          unicode: action.payload.unicode || state.tukForm[index].unicode,
          gurmukhiScript: action.payload.gurmukhiScript || state.tukForm[index].gurmukhiScript,
      });

    case 'UPDATE_UNICODE_RAW':
      index = findTukIndex(state, action.payload.tukNumber);
      return updateTukForm(index, state, {
        unicodeRaw: action.payload.unicodeRaw,
        unicode: action.payload.unicode,
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

const generateUnicodeRaw = (unicode, vishraams, thamkis) => {
  const unicodeArr = unicode.split(' ');
  vishraams = JSON.parse(vishraams);
  thamkis = JSON.parse(thamkis);
  for (let i = 0; i < unicodeArr.length; i++) {
    if (vishraams[0] === i) {
      unicodeArr[i] += ';';
      vishraams.shift();
    }
    if (thamkis[0] === i) {
      unicodeArr[i] += ',';
      thamkis.shift();
    }
    debugger;
  }
  return unicodeArr.join(' ');
};

const updateOriginalTukForm = (index, oldState, newState) => {
  return {
    ...oldState,
    tukForm: [
      ...oldState.tukForm.slice(0, index), // everything before current post
      { ...oldState.tukForm[index], ...newState },
      ...oldState.tukForm.slice(index + 1), // everything after current post
    ],
    originalTukForm: [
      ...oldState.originalTukForm.slice(0, index), // everything before current post
      { ...oldState.originalTukForm[index], ...newState },
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
const handleLineBreaks = (str) => str.trim().replace(/\r?\n|\r/g, '; ');

const replaceSpecialCharacters = (str) => {
  if (!hasSpaceBeforePeriod(str)) {
    str = str.slice(0, str.length - 1) + ` ${str[str.length - 1]}`;
  }
  return handleLineBreaks(replaceQuotationMarksWithBindi(str));
};
const removeSpecialChars = (str) => str.replace(/[,.'”*;]/g, '');
const keepVishraams = (str) => str.replace(/[.']/g, '');

// When unicodeRaw changes
const updateUnicodeRaw = (dispatch) => (unicodeRaw, tukNumber) => {
  const unicodeRawSafe = replaceSpecialCharacters(unicodeRaw);
  const unicodeSafe = removeSpecialChars(unicodeRawSafe);
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

const updateFormItem = (dispatch) => (formItem) => {
  dispatch({ type: 'UPDATE_FORM_ITEM', payload: formItem });
};

const initializeFormState = (dispatch) => (pauri) => {
  pauri.tuks.map((tuk) => {
    dispatch({ type: 'POPULATE_TUK', payload: tuk });
  });
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
    initializeFormState,
  },
  {
    originalTukForm: [
      {
        unicodeRaw: '',
        unicode: '',
        gurmukhiScript: '',
        englishTranslit: '',
        firstLetters: '',
        thamki: [],
        vishraam: [],
        tukNumber: 1,
      },
    ],
    tukForm: [
      {
        unicodeRaw: '',
        unicode: '',
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
