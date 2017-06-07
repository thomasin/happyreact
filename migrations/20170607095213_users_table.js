exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('email').unique().notNullable()
    table.string('hashedPassword').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
}
