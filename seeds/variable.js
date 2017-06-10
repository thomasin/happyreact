exports.seed = function (knex, Promise) {
  return knex('variable').del()
    .then(function () {
      return Promise.all([
        knex('variable').insert({user_id: 203, id: 56, name: 'Sleep', type: 'integer'}),
        knex('variable').insert({user_id: 203, id: 57, name: 'Meditation', type: 'integer'}),
        knex('variable').insert({user_id: 203, id: 58, name: 'Coffee cups', type: 'integer'}),
        knex('variable').insert({user_id: 203, id: 59, name: 'Gym', type: 'boolean'}),
        knex('variable').insert({user_id: 203, id: 60, name: 'On period', type: 'boolean'})
      ])
    })
}
