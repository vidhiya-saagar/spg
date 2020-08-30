exports.seed = async function runChhandSeeds(knex) {
  async function createChhandTypes(knex) {
    await knex('chhand_types').del();
    return await knex('chhand_types').insert([
      {
        id: 1,
        chhand_name_unicode: 'ਦੋਹਰਾ',
        chhand_name_english: 'Dohra',
        chhand_name_gs: 'dohrw',
      },
    ]);
  }
  async function createChhands(knex) {
    await knex('chhands').del();
    return await knex('chhands').insert([
      {
        id: 1,
        order_number: 1,
        chhand_name_english: 'Dohra',
        chhand_type_id: 1,
        chapter_id: 1,
      },
    ]);
  }

  await createChhandTypes(knex);
  await createChhands(knex);
};
