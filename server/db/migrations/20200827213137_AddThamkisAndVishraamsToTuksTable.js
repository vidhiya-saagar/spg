exports.up = async function startMigration(knex) {
  await knex.schema.alterTable('tuks', function updateTuksTable(t) {
    t.json('vishraams');
    t.json('thamkis');
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('tuks', function dropColumns(t) {
    t.dropColumn('vishraams');
    t.dropColumn('thamkis');
  });
};
