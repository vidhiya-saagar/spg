const { addTimestamps, references } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable(
    'chapter_kathas',
    function createChapterKathasTable(t) {
      t.increments().notNullable();
      references(t, 'chapter');
      references(t, 'katha');
      addTimestamps(t, knex);
    }
  );
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('chapter_kathas');
};
