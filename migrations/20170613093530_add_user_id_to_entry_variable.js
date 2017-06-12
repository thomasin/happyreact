exports.up = function (knex, Promise) {
  return knex.schema.table('entry_variable', (table) => {
    table.integer('user_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('entry_variable', (table) => {
    table.dropColumn('user_id')
  })
}
