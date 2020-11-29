const { addTimestamps, references } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('kathas', function createKathasTable(t) {
    t.increments().notNullable();
    references(t, 'giani', false); // The last argument is notNullable. We will allow null
    t.string('title'); //.collate('utf8_unicode_ci');
    t.string('public_url').notNullable();
    t.string('file_url');
    t.integer('year');
    addTimestamps(t, knex);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('kathas');
};
