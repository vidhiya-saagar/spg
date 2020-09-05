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

export const formattedTukForm = (tukForm) => {
  const mappings = {
    tukNumber: 'line_number',
    unicode: 'content_unicode',
    unicodeVishraam: 'content_unicode_vishraam',
    gurmukhiScript: 'content_gs',
    englishTranslit: 'content_transliteration_english',
    firstLetters: 'first_letters',
    thamki: 'thamkis',
    vishraam: 'vishraams',
  };
  return reMapAll(mappings, [], tukForm);
};
