exports.up = function (knex, Promise) {
  return knex.schema.table('user', (table) => {
    table.integer('verified')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('verified')
  })
}
