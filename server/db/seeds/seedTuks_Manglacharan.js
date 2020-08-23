exports.seed = async function seedManglacharan(knex) {
  await knex('tuks').del();
  return await knex('tuks').insert([
    {
      id: 1,
      line_number: 1,
      chhand_id: 1,
      chhand_type_id: 4,
      chapter_id: 1,
      pauri_id: 1,
      content_unicode: 'ਏਕੁੰਕਾਰਾ ਸਤਿਗੁਰੂ ਤਿਹਿ ਪ੍ਰਸਾਦਿ ਸਚੁ ਹੋਇ',
      content_gs: 'eykuMkwrw siqgurU iqih pRswid scu hoie',
      content_transliteration_english:
        'eku(n)kaaraa satiguroo teh prasaadh sach hoi',
      first_letters: 'ਏਸਤਪਸਹ',
    },
  ]);
};
