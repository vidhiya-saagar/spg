import _ from 'lodash';

const reMap = (customSchema, conversionSchema, data) => {
  const actualKeys = conversionSchema;
  const availableKeys = _.values(customSchema);
  const missingKeys = _.difference(actualKeys, availableKeys);
  if (!_.isArray(data)) return createObject(customSchema, missingKeys, data);
  else return reMapAll(customSchema, missingKeys, data);
};

const createObject = (customSchema, missingKeys, data) => {
  const newObj = Object.create({});
  // add available keys
  for (let key of Object.keys(customSchema)) {
    const k = customSchema[key];
    newObj[k] = data[key];
  }
  // add missing keys
  for (let k of missingKeys) {
    newObj[k] = '';
  }
  return _.omitBy(newObj, _.isUndefined);
};

const reMapAll = (customSchema, missingKeys, data) => {
  const newArray = [];
  for (let d of data) {
    newArray.push(createObject(customSchema, missingKeys, d));
  }
  return newArray;
};

export const formattedTukFormObj = (tukForm) => {
  const mappings = {
    tukNumber: 'line_number',
    unicode: 'content_unicode',
    // unicodeVishraam: 'content_unicode_vishraam',
    gurmukhiScript: 'content_gs',
    englishTranslit: 'content_transliteration_english',
    firstLetters: 'first_letters',
    thamki: 'thamkis',
    vishraam: 'vishraams',
  };

  return reMapAll(mappings, [], tukForm);
};

const numToGurmukhi = (num) => {
  const mappings = {
    0: '੦',
    1: '੧',
    2: '੨',
    3: '੩',
    4: '੪',
    5: '੫',
    6: '੬',
    7: '੭',
    8: '੮',
    9: '੯',
  };
  return num
    .toString()
    .split('')
    .map((c) => mappings[c])
    .join('');
};

export const getFormattedSignatureObj = (num) => {
  if (num == null || num === 0) return;
  return {
    signature_unicode: `॥${numToGurmukhi(num)}॥`,
    signature_gs: `]${num}]`,
    signature_english: `||${num}||`,
  };
};
