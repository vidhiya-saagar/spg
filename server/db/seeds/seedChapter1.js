exports.seed = async function createChapterOne(knex) {
  // Deletes ALL existing entries
  await knex('chapters').del();
  return await knex('chapters').insert([
    {
      id: 1,
      number: 1,
      order_number: 1,
      title_unicode: 'ਮੰਗਲਾ ਚਰਨ, ਨਾਮ ਮਹਿਮਾ ਬਰਨਨ, ਨਾਮ ਪ੍ਰਥਮੋ ਧ੍ਯਾਇ',
      title_gs: 'ïmMglw crn, nwm mihmw brnn, nwm pRQmo DÎwie',
      title_transliteration_english:
        'ma(n)galaa charana, naam mahimaa baranana, naam prathamo dhayai',
      order_number: 1,
      description_english:
        "Kavi Santokh Singh's masterpiece begins with some of the most profolific Mangals of all time.",
    },
  ]);
};
