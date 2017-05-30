
exports.up = function (knex, Promise) {
  return knex.schema.table('entry', (table) => {
    table.string('title')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('entry', (table) => {
    table.dropColumn('title')
  })
}
