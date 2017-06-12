const test = require('ava')
const bcrypt = require('bcrypt')

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
  return db.createUser(t.context.connection, 'email2@email.com', 'cats')
    .then(() => {
      return db.findByEmail(t.context.connection, 'email2@email.com')
    })
    .then((user) => {
      t.is(user.id, 205)
      return db.comparePasswords(user.hashedPassword, 'cats')
    })
    .then((res) => {
      t.is(res, true)
    })
})

test('createUser throws error when adding same email', t => {
  return db.createUser(t.context.connection, 'email@email.com', 'cats')
    .then()
    .catch((err) => {
      t.is(err.errno, 19)
    })
})

test('checkEmail returns an array of length 0 if email doesnt exist', t => {
  return db.checkEmail(t.context.connection, 'idontexist@test.com')
    .then((res) => {
      t.is(res.length, 0)
    })
})

test('checkEmail returns the email if it exists', t => {
  return db.checkEmail(t.context.connection, 'testing@test.com')
    .then((res) => {
      t.is(res.length, 1)
      t.is(res[0].email, 'testing@test.com')
    })
})

test('Compare passwords returns true when correct password', t => {
  return db.comparePasswords(bcrypt.hashSync('dogs', 10), 'dogs')
    .then((res) => {
      t.is(res, true)
    })
})

test('Compare passwords returns false when not matching password', t => {
  return db.comparePasswords(bcrypt.hashSync('dogs', 10), 'cats')
    .then((res) => {
      t.is(res, false)
    })
})
