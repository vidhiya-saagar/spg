/*
 * Throughout SPG, some Chhands have some "extra context."
 * For example:
 * "[ਅਰਥ] ਚੌਪਈ"
 * "[ਚਰਿੱਤ੍ਰ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ] ਸ੍ਵੈਯਾ"
 * */
exports.up = async function startMigration(knex) {
  await knex.schema.table('chhands', function updateChhandsTable(t) {
    t.string('prefix_unicode');
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('chhands', function dropColumnsInChhandsTable(t) {
    t.dropColumn('prefix_unicode');
  });
};
