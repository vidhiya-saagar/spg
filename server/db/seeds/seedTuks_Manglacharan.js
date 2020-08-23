exports.seed = async function seedManglacharan(knex) {
  await knex('tuks').del();

  await knex('tuks').insert([
    {
      id: 1,
      line_number: 1,
      chhand_id: 1,
      chhand_type_id: 4,
      chapter_id: 1,
      pauri_id: 1,
      content_unicode: 'ਏਕੁੰਕਾਰਾ ਸਤਿਗੁਰੂ ਤਿਹਿ ਪ੍ਰਸਾਦਿ ਸਚੁ ਹੋਇ ।',
      content_gs: 'eykuMkwrw siqgurU iqih pRswid scu hoie [',
      content_transliteration_english:
        'eku(n)kaaraa satiguroo teh prasaadh sach hoi |',
      first_letters: 'ਏਸਤਪਸਹ',
    },
    {
      id: 2,
      line_number: 2,
      chhand_id: 1,
      chhand_type_id: 4,
      chapter_id: 1,
      pauri_id: 1,
      content_unicode: 'ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤੇ ਵਿਘਨ ਵਿਨਾਸ਼ਨ ਸੋਇ',
      content_gs: 'vwihgurU jI kI Pqy ivGn ivnwsæn soie',
      content_transliteration_english:
        'vaahiguroo jee kee fate vighan vinaasn soi',
      first_letters: 'ਵਜਕਫਵਵਸ',
    },
  ]);

  return await knex('pauris').where('id', 1).first().update({
    last_tuk_id: 2,
  });
};

// SELECT *, ARRAY_AGG(tuks) FROM pauris LEFT JOIN tuks ON tuks.VERSE_ID = pauris.ID GROUP BY pauris.ID
