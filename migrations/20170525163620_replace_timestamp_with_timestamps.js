exports.up = function(knex, Promise) {
  return knex.schema.table('entry', (table) => {
    table.dropColumn('created_at')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('entry', (table) => {
    table.timestamp('created_at')
  })
};
