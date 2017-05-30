import test from 'ava'
import request from 'supertest'

import app from '../../server/server'

let configureDatabase = require('./helpers/database-config')
configureDatabase(test, app)


test.cb('GET /getAll returns all entries', t => {
  request(t.context.app)
    .get('/getAll')
    .query({ tableName: 'entry' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body.length, 9)
      t.ifError(err)
      t.end()
    })
})

test.cb('POST /add-variable adds a variable', t => {
  request(t.context.app)
    .post('/add-variable')
    .send({
      variableName: 'Im a variable'
    })
    .expect(201)
    .then(() => {
      return t.context.connection('variable').select()
    })
    .then((res) => {
          t.is(res[res.length-1].name, 'Im a variable')
          t.end()
    })
})
