const { references } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.alterTable('tuks', function updateTuksTable(t) {
    references(t, 'pauri'); // pauri_id
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('tuks', function dropPauriIdColumn(t) {
    t.dropForeign('pauri_id');
    t.dropColumn('pauri_id');
  });
};
