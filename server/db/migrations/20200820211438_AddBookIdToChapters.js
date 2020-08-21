const { references } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.alterTable('chapters', function updateChaptersTable(t) {
    references(t, 'book'); // book_id
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('chapters', function dropBookIdColumn(t) {
    t.dropForeign('book_id');
    t.dropColumn('book_id');
  });
};
