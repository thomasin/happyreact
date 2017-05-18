exports.up = function(knex, Promise) {
    return knex.schema.createTable('entry', (table) => {
      table.increments('id')
      table.text('text')
      table.timestamp('created_at')
      table.integer('mood_id')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entry')
};
