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

module.exports = { references };
