const { references, addTimestamps } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('tuks', function createTukTable(t) {
    t.increments().notNullable();
    t.integer('line_number').notNullable();
    references(t, 'chhand');
    references(t, 'chhand_type');
    references(t, 'chapter');
    t.string('content_unicode').collate('utf8_unicode_ci');
    t.string('content_gs');
    t.string('content_transliteration_english');
    t.string('first_letters');
    addTimestamps(t, knex);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('tuks');
};
