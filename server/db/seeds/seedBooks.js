exports.seed = async function seedNanakPrakash(knex) {
  await knex('books').del();
  return await knex('books').insert([
    {
      id: 1,
      book_order: 1,
      title_unicode: 'ਸ੍ਰੀ ਨਾਨਕ ਪ੍ਰਕਾਸ਼ ਪੂਰਬਾਰਧ',
      title_gs: 'sRI nwnk pRkwsæ pUrbwrD',
      title_transliteration_english: 'Sri Nanak Prakash Poorbaradh',
      description_english: '',
    },
  ]);
};
