exports.up = function (knex, Promise) {
  return knex.schema.createTable('mood', (table) => {
    table.increments('id')
    table.integer('energy')
    table.integer('outlook')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('mood')
}
