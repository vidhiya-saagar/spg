const { references, addTimestamps } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('pauris', function createPaurisTable(t) {
    t.increments().notNullable();
    t.integer('number').notNullable();
    t.string('signature_unicode').collate('utf8_unicode_ci');
    t.string('signature_gs');
    t.string('signature_english');
    references(t, 'chhand');
    references(t, 'chapter');
    // Allow FKID to be null
    references(t, 'tuk', false, 'first_tuk');
    references(t, 'tuk', false, 'last_tuk');
    addTimestamps(t, knex);
  });
};

exports.down = async function dropPaurisTables(knex) {
  await knex.schema.dropTableIfExists('pauris');
};
