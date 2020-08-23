exports.seed = async function (knex) {
  await knex('pauris').del();

  return await knex('pauris').insert({
    id: 1,
    number: 1,
    signature_unicode: '॥੧॥',
    signature_gs: ']1]',
    signature_english: '||1||',
    chapter_id: 1,
    chhand_id: 1,
  });
};
