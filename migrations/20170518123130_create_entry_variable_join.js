exports.up = function(knex, Promise) {
  return knex.schema.createTable('entry_variable', (table) => {
    table.integer('entry_id')
    table.integer('variable_id')
    table.float('value')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entry_variable')
};
