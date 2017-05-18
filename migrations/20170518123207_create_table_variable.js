exports.up = function(knex, Promise) {
  return knex.schema.createTable('variable', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('variable')
};
