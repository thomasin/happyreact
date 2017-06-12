var bcrypt = require('bcrypt')

exports.seed = function (knex, Promise) {
  return knex('user').del()
    .then(function () {
      return Promise.all([
        knex('user').insert({id: 200, email: 'email@email.com', hashedPassword: bcrypt.hashSync('cats', 10)}),
        knex('user').insert({id: 201, email: 'iamemail@email.co.nz', hashedPassword: bcrypt.hashSync('dogs', 10)}),
        knex('user').insert({id: 202, email: 'testing@test.com', hashedPassword: bcrypt.hashSync('elephants', 10)}),
        knex('user').insert({id: 203, email: 'thomasinthomasin@gmail.com', hashedPassword: bcrypt.hashSync('vanilla', 10)}),
        knex('user').insert({id: 204, email: 'email123@gmail.com', hashedPassword: bcrypt.hashSync('dolphins', 10)})
      ])
    })
}
