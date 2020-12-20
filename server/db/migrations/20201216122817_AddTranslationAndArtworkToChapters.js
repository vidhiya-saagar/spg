exports.up = async function startMigration(knex) {
  await knex.schema.table('chapters', function updateChaptersTable(t) {
    t.string('title_translation');
    t.string('artwork_url');
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('chapters', function dropColumnsInChaptersTable(t) {
    t.dropColumn('title_translation');
    t.dropColumn('artwork_url');
  });
};
