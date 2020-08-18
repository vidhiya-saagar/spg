const references = (
  currentTable,
  tableToReference,
  notNullable = true,
  foreignKey = ''
) => {
  const definition = currentTable
    .integer(`${tableToReference}_id`)
    .unsigned()
    .references('id')
    .inTable(`${tableToReference}s`)
    .onDelete('cascade');

  if (notNullable) definition.notNullable();
  return definition;
};

const addTimestamps = (table, knex) => {
  table
    .dateTime('created_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table
    .dateTime('updated_at')
    .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
};

module.exports = { references, addTimestamps };
