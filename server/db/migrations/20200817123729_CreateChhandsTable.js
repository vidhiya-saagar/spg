const { references, addTimestamps } = require('../knexHelper');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('chhand_types', function createChhandTypesTable(
    t
  ) {
    t.increments().notNullable();
    t.string('chhand_name_unicode').collate('utf8_unicode_ci');
    t.string('chhand_name_english');
    t.string('chhand_name_gs');
    addTimestamps(t, knex);
  });

  await knex.schema.createTable('chhands', function createChhandsTable(t) {
    t.increments().notNullable();
    t.integer('order_number').notNullable();
    t.string('chhand_name_english'); // Really... not necessary but will be easier on dev side
    references(t, 'chhand_type');
    references(t, 'chapter');
    addTimestamps(t, knex);
  });
};

exports.down = async function dropChhandRelatedTables(knex) {
  await knex.schema.dropTableIfExists('chhands');
  await knex.schema.dropTableIfExists('chhand_types');
};
