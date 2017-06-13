import test from 'ava'
import request from 'supertest'
const httpMocks = require('node-mocks-http')

import app from '../../server/server'

let configureDatabase = require('./helpers/database-config')
configureDatabase(test, app)

/* ----- Authorised ----- */

/*
test.serial.cb('POST /add-variable adds a variable', t => {
  request(t.context.app)
    .post('/dashboard/add-variable')
    .send({
      variableName: 'Im a variable'
    })
    .expect(201)
    .then(() => {
      return t.context.connection('variable').select()
    })
    .then((res) => {
      t.is(res[res.length - 1].name, 'Im a variable')
      t.end()
    })
})

test.serial.cb('POST /add-variable returns 400 if variable not valid', t => {
  request(t.context.app)
    .post('/dashboard/add-variable')
    .send({
      variableName: 'notvalidbecauseiamabittoolong'
    })
    .expect(400)
    .end((err, res) => {
      t.is(res.statusCode, 400)
  })
})

test.cb('GET /getData returns data', t => {
  request(t.context.app)
    .get('/dashboard/getData')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      let keys = Object.keys(res.body.data[0])
      res.body.variableList.forEach((variable) => {
        t.is(keys.includes(variable), true)
      })
      t.is(keys.includes('id'), true)
      t.is(keys.includes('date'), true)
      t.is(keys.includes('energy'), true)
      t.is(keys.includes('outlook'), true)
      t.end()
    })
})

test.cb('GET /getAll of entries returns entries', t => {
  request(t.context.app)
    .get('/dashboard/getAll')
    .query({ tableName: 'entry' })
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.is(res.body[8].title, 'Hack me')
      t.ifError(err)
      t.end()
    })
})

*/

// test.cb('GET /getAll of entries returns entries', t => {
//     httpMocks.createRequest({
//       method: 'GET',
//       url: '/'
//       user: {
//         name: 'test'
//       }
//     })
//
//     httpMocks.createResponse()
//   request(t.context.app)
//     .get('/dashboard/getAll')
//     .query({ tableName: 'entry' })
//     .expect(200)
//     .end((err, res) => {
//       if (err) throw err
//       t.is(res.body[8].title, 'Hack me')
//       t.ifError(err)
//       t.end()
//     })
// })

/*
test.cb('GET /getAll of bad query returns error', t => {
  request(t.context.app)
    .get('/dashboard/getAll')
    .query({ tableName: 'test' })
    .expect(401)
    .end((err, res) => {
      if (err) throw err
      t.is(res.status, 401)
      t.end()
    })
})

test.cb('GET /getAll of variables returns variables', t => {
  request(t.context.app)
    .get('/dashboard/getAll')
    .query({ tableName: 'variable' })
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.is(res.body[4].name, 'On period')
      t.end()
    })
})

test.cb('POST /add-entry adds a entry', t => {
  request(t.context.app)
    .post('/dashboard/add-entry')
    .send({
      title: 'Im a entry',
      text: 'Test',
      mood_id: 55,
      variables: [{
        id: 2,
        value: '10'
      }]
    })
    .expect(201)
    .then(() => {
      return t.context.connection('entry').select()
    })
    .then((entry) => {
      t.is(entry[entry.length - 1].title, 'Im a entry')
      return t.context.connection('entry_variable').select()
    })
    .then((variable) => {
      t.is(variable[variable.length - 1].value, 10)
      t.end()
    })
})

test.cb('POST /add-entry returns 400 if one or more variables are invalid', t => {
  request(t.context.app)
    .post('/dashboard/add-entry')
    .send({
      title: 'Im a entry',
      text: 'Test',
      mood_id: 55,
      variables: [{
        id: 2,
        value: 'invalid'
      }]
    })
    .expect(400)
    .end((err, res) => {
      t.is(res.statusCode, 400)
  })
})
*/

test.cb('POST /checkEmail returns true if email already exists', t => {
  request(t.context.app)
    .post('/checkEmail')
    .send({ email: 'testing@test.com' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body.doesExist, true)
      t.end()
    })
})

test.cb('POST /checkEmail returns false if email doesnt exist', t => {
  request(t.context.app)
    .post('/checkEmail')
    .send({ email: 'idontexist@test.com' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body.doesExist, false)
      t.end()
    })
})

test.cb('POST /signup returns error if user already exists', t => {
  request(t.context.app)
    .post('/signup')
    .send({
      email: 'testing@test.com',
      password: 'happyhippo'
    })
    .expect(409)
    .end((err, res) => {
      t.is(res.statusCode, 409)
      t.end()
    })
})

test.cb('POST /signup works correctly', t => {
  request(t.context.app)
    .post('/signup')
    .send({
      email: 'idontexist@test.com',
      password: 'happyhippo'
    })
    .expect(201)
    .end((err, res) => {
      t.is(res.statusCode, 201)
      t.end()
    })
})

test.cb('POST /signup returns error if email is not valid', t => {
  request(t.context.app)
    .post('/signup')
    .send({
      email: 'notvalidemail',
      password: 'happyhippo'
    })
    .expect(400)
    .end((err, res) => {
      t.is(res.statusCode, 400)
      t.end()
    })
})

test.cb('POST /signup returns error if password is not valid', t => {
  request(t.context.app)
    .post('/signup')
    .send({
      email: 'idontexist@test.com',
      password: 'password'
    })
    .expect(400)
    .end((err, res) => {
      t.is(res.statusCode, 400)
      t.end()
    })
})

/* ----- Unauthorised ----- */

test.serial.cb('POST /add-variable redirects when user is unauthorised', t => {
  request(t.context.app)
    .post('/dashboard/add-variable')
    .send({
      variableName: 'Im a variable'
    })
    .expect(302)
    .end((err, res) => {
      t.is(res.header['location'], '/')
      t.is(res.statusCode, 302)
      t.end()
    })
})

test.cb('GET /getData redirects when user is unauthorised', t => {
  request(t.context.app)
    .get('/dashboard/getData')
    .expect(302)
    .end((err, res) => {
      t.is(res.statusCode, 302)
      t.end()
    })
})

test.cb('GET /getAll of entries redirects when user is unauthorised', t => {
  request(t.context.app)
    .get('/dashboard/getAll')
    .query({ tableName: 'entry' })
    .expect(302)
    .end((err, res) => {
      t.is(res.header['location'], '/')
      t.is(res.statusCode, 302)
      t.end()
    })
})

test.cb('GET /getAll of variables redirects when user is unauthorised', t => {
  request(t.context.app)
    .get('/dashboard/getAll')
    .query({ tableName: 'variable' })
    .expect(302)
    .end((err, res) => {
      t.is(res.header['location'], '/')
      t.is(res.statusCode, 302)
      t.end()
    })
})

test.cb('GET /logout redirects when user is unauthorised', t => {
  request(t.context.app)
    .get('/dashboard/logout')
    .expect(302)
    .end((err, res) => {
      t.is(res.header['location'], '/')
      t.is(res.statusCode, 302)
      t.end()
    })
})

test.cb('POST /add-entry redirects when user is unauthorised', t => {
  request(t.context.app)
    .post('/dashboard/add-entry')
    .send({
      title: 'Im a entry',
      text: 'Test',
      mood_id: 55,
      variables: [{
        id: 2,
        value: '10'
      }]
    })
    .expect(302)
    .end((err, res) => {
      t.is(res.header['location'], '/')
      t.is(res.statusCode, 302)
      t.end()
    })
})
