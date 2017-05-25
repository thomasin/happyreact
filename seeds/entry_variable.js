exports.seed = function (knex, Promise) {
  return knex('entry_variable').del()
    .then(function () {
      return Promise.all([
        knex('entry_variable').insert({entry_id: 73, variable_id: 56, value: 9}),
        knex('entry_variable').insert({entry_id: 73, variable_id: 58, value: 2}),
        knex('entry_variable').insert({entry_id: 73, variable_id: 60, value: 1}),
        knex('entry_variable').insert({entry_id: 74, variable_id: 56, value: 8}),
        knex('entry_variable').insert({entry_id: 74, variable_id: 57, value: 10}),
        knex('entry_variable').insert({entry_id: 74, variable_id: 58, value: 1}),
        knex('entry_variable').insert({entry_id: 75, variable_id: 60, value: 1}),
        knex('entry_variable').insert({entry_id: 75, variable_id: 56, value: 6}),
        knex('entry_variable').insert({entry_id: 75, variable_id: 57, value: 12}),
        knex('entry_variable').insert({entry_id: 76, variable_id: 60, value: 1}),
        knex('entry_variable').insert({entry_id: 76, variable_id: 56, value: 8}),
        knex('entry_variable').insert({entry_id: 76, variable_id: 58, value: 2}),
        knex('entry_variable').insert({entry_id: 77, variable_id: 60, value: 1}),
        knex('entry_variable').insert({entry_id: 77, variable_id: 56, value: 7}),
        knex('entry_variable').insert({entry_id: 77, variable_id: 58, value: 1}),
        knex('entry_variable').insert({entry_id: 78, variable_id: 60, value: 0}),
        knex('entry_variable').insert({entry_id: 78, variable_id: 56, value: 11}),
        knex('entry_variable').insert({entry_id: 78, variable_id: 59, value: 1})
      ]);
    });
};
