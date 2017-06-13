import test from 'ava'
import nock from 'nock'

import * as api from '../../client/scripts/api'

test.cb('get Data connecting to server', t => {
  var expected = { test: 'test passed' }
  var scope = nock('http://localhost:80/')
    .get('/dashboard/getData')
    .reply(200, expected)

  api.makeDataRequest((err, actual) => {
    t.is(actual.body.test, expected.test)
    t.is(err, null)
    scope.done()
    t.end()
  })
})

test.cb('get All Of Table connecting to server', t => {
  var expected = { test: 'test passed' }
  var scope = nock('http://localhost:80/')
    .get('/dashboard/getAll')
    .query({tableName: 'entry'})
    .reply(200, expected)

  api.getAllOfTable('entry')
    .then((actual) => {
      t.is(actual.test, expected.test)
      scope.done()
      t.end()
    })
})
