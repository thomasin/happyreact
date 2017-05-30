exports.seed = function (knex, Promise) {
  return knex('variable').del()
    .then(function () {
      return Promise.all([
        knex('variable').insert({id: 56, name: 'Sleep', type: 'integer'}),
        knex('variable').insert({id: 57, name: 'Meditation', type: 'integer'}),
        knex('variable').insert({id: 58, name: 'Coffee cups', type: 'integer'}),
        knex('variable').insert({id: 59, name: 'Gym', type: 'boolean'}),
        knex('variable').insert({id: 60, name: 'On period', type: 'boolean'})
      ])
    })
}
