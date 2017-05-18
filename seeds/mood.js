exports.seed = function (knex, Promise) {
  return knex('mood').del()
    .then(function () {
      return Promise.all([
        knex('mood').insert({id: 11, energy: 1, outlook: 1}),
        knex('mood').insert({id: 12, energy: 1, outlook: 2}),
        knex('mood').insert({id: 13, energy: 1, outlook: 3}),
        knex('mood').insert({id: 14, energy: 1, outlook: 4}),
        knex('mood').insert({id: 15, energy: 1, outlook: 5}),
        knex('mood').insert({id: 21, energy: 2, outlook: 1}),
        knex('mood').insert({id: 22, energy: 2, outlook: 2}),
        knex('mood').insert({id: 23, energy: 2, outlook: 3}),
        knex('mood').insert({id: 24, energy: 2, outlook: 4}),
        knex('mood').insert({id: 25, energy: 2, outlook: 5}),
        knex('mood').insert({id: 31, energy: 3, outlook: 1}),
        knex('mood').insert({id: 32, energy: 3, outlook: 2}),
        knex('mood').insert({id: 33, energy: 3, outlook: 3}),
        knex('mood').insert({id: 34, energy: 3, outlook: 4}),
        knex('mood').insert({id: 35, energy: 3, outlook: 5}),
        knex('mood').insert({id: 41, energy: 4, outlook: 1}),
        knex('mood').insert({id: 42, energy: 4, outlook: 2}),
        knex('mood').insert({id: 43, energy: 4, outlook: 3}),
        knex('mood').insert({id: 44, energy: 4, outlook: 4}),
        knex('mood').insert({id: 45, energy: 4, outlook: 5}),
        knex('mood').insert({id: 51, energy: 5, outlook: 1}),
        knex('mood').insert({id: 52, energy: 5, outlook: 2}),
        knex('mood').insert({id: 53, energy: 5, outlook: 3}),
        knex('mood').insert({id: 54, energy: 5, outlook: 4}),
        knex('mood').insert({id: 55, energy: 5, outlook: 5})
      ]);
    });
};
