exports.up = async function startMigration(knex) {
  await knex.schema.table('tuks', function updateTuksTable(t) {
    t.string('translation');
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('tuks', function dropColumnsInTuksTable(t) {
    t.dropColumn('translation');
  });
};
