import test from 'ava'
import request from 'supertest'

import app from '../../server/server'

// the server keeps the widgets in memory so no knex setup needed

test.serial.cb('GET /getAll', t => {
  request(app)
    .get('/getAll')
    .query({ tableName: 'entry' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body.length, 3)
      t.ifError(err)
      t.end()
    })
})
