// @brief: Validating Query Params
const isSafeParam = (table, param) => {
  switch (table.toUpperCase()) {
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

module.exports = { isSafeParam };
