// @brief: Validating Query Params
const isSafeParam = (table, param) => {
  switch (table.toUpperCase()) {
    case 'BOOKS':
      return ['book_order'].includes(param);
    case 'CHAPTERS':
      return [
        'number',
        'book_id',
        'title_unicode',
        'title_gs',
        'title_transliteration_english',
        'last',
      ].includes(param);
      break;
    case 'CHHANDS':
      return [
        'order_number',
        'chhand_name_english',
        'chhand_type_id',
        'chapter_id',
        'last',
      ].includes(param);
      break;
    case 'PAURIS':
      return [
        'number',
        'chhand_id',
        'chapter_id',
        'first_tuk_id',
        'last_tuk_id',
      ].includes(param);
      break;
    default:
      return false;
      break;
  }
};

const isGurmukhi = (s) => {
  if (/[\u0A00-\u0A7F]/.test(s)) {
    return true;
  } else {
    throw new Error('Input must be Gurmukhi unicode.');
  }
};

module.exports = { isSafeParam, isGurmukhi };
