var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../../server/UserDb')

test('findById returns correct user', t => {
  return db.findById(t.context.connection, 200)
    .then((result) => {
      t.is(result.email, 'email@email.com')
    })
})

test('findByEmail returns correct user', t => {
  return db.findByEmail(t.context.connection, 'email@email.com')
    .then((result) => {
      t.is(result.id, 200)
    })
})

test('createUser creates new user', t => {
  return db.createUser(t.context.connection, "email2@email.com", 'cats')
    .then(() => {
      return db.findByEmail(t.context.connection, 'email2@email.com')
        .then((result) => {
          t.is(result.id, 205)
        })
    })
    .then(() => {
      return db.comparePasswords(t.context.connection, 'email2@email.com', 'cats')
        .then((res) => {
          t.is(res, true)
        })
    })
})

test('createUser throws error when adding same email', t => {
  return db.createUser(t.context.connection, "email@email.com", 'cats')
    .then((res) => {
        t.not(typeof res[0], 'number')
    })
})
