exports.up = async function startMigration(knex) {
  const transaction = await knex.transaction();
  try {
    await transaction.schema.alterTable('kathas', function inceaseLimit(t) {
      t.string('public_url', 1000).alter();
      t.string('file_url', 1000).alter();
    });

    await transaction.commit();
    console.log('Finished!');
  } catch (error) {
    console.log('Error!', error);
    await transaction.rollback();
  }
};

exports.down = async function startMigration(knex) {
  const transaction = await knex.transaction();
  try {
    await transaction.schema.alterTable('kathas', function decreaseLimit(t) {
      t.string('public_url', 255).alter();
      t.string('file_url', 255).alter();
    });
  } catch (error) {
    await transaction.rollback();
  }
};
