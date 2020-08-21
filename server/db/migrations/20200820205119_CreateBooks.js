const { addTimestamps } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('books', function createBooksTable(t) {
    t.increments().notNullable();
    t.integer('book_order').notNullable();
    t.string('title_unicode').collate('utf8_unicode_ci');
    t.string('title_gs');
    t.string('title_transliteration_english').notNullable(); // Raas 1, Raas 2, Rut 6, Ayan 2
    t.text('description_english', 'mediumtext');
    addTimestamps(t, knex);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('books');
};
