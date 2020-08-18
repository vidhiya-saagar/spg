const { addTimestamps } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('chapters', function createChapterTable(t) {
    t.increments().notNullable();
    t.integer('number').notNullable();
    t.integer('order_number').notNullable();
    // t.specificType('title_unicode', 'utf8mb4');
    t.string('title_unicode').collate('utf8_unicode_ci');
    t.string('title_gs');
    t.string('title_transliteration_english');
    t.text('description_english', 'mediumtext');
    addTimestamps(t, knex);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('chapters');
};
