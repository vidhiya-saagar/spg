import createDataContext from './createDataContext';
import * as anvaad from 'anvaad-js';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ADD_PAURI_FORM':
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      return {
        ...state,
        gurmukhiScript: action.payload.gurmukhiScript,
        englishTranslit: action.payload.englishTranslit,
        firstLetters: action.payload.firstLetters,
        thamki: action.payload.thamki,
        vishraam: action.payload.vishraam,
      };
    case 'UPDATE_FORM_ITEM':
      console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
      return {
        ...state,
        unicodeRaw: action.payload.unicodeRaw,
        unicode: action.payload.unicode,
        gurmukhiScript: action.payload.gurmukhiScript,
        englishTranslit: action.payload.englishTranslit,
        firstLetters: action.payload.firstLetters,
        thamki: action.payload.thamki,
        vishraam: action.payload.vishraam,
      };
    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
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

const updateAddPauriForm = (dispatch) => (unicode) => {
  debugger;
  let _gurmukhiScript = anvaad.unicode(unicode, true);
  const formData = {
    gurmukhiScript: _gurmukhiScript,
    englishTranslit: anvaad.translit(_gurmukhiScript),
    firstLetters: anvaad.firstLetters(unicode),
    thamki: findWordIndiciesWith(unicode, ','),
    vishraam: findWordIndiciesWith(unicode, '.'),
  };
  dispatch({ type: 'UPDATE_ADD_PAURI_FORM', payload: formData });
};

const updateFormItem = (dispatch) => (formItem) => {
  debugger;
  dispatch({ type: 'UPDATE_FORM_ITEM', payload: formItem });
};

export const { Provider, Context } = createDataContext(
  formReducer,
  { updateAddPauriForm, updateFormItem },
  {
    unicodeRaw: '',
    unicode: '',
    thamki: [],
    vishraam: [],
    gurmukhiScript: '',
    englishTranslit: '',
    firstLetters: '',
    pauriNumber: 2,
  }
);
