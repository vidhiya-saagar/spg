// Gianis is Gender Netural in this context
const { addTimestamps } = require('../knexHelper');

// TODO: Perhaps add their vidya/lineage in the future
exports.up = async function startMigration(knex) {
  await knex.schema.createTable('gianis', function createGianisTable(t) {
    t.increments().notNullable();
    t.string('name').notNullable();
    t.string('artwork_url');
    addTimestamps(t, knex);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('gianis');
};
