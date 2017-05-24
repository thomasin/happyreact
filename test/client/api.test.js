import test from 'ava'
import nock from 'nock'

import * as api from '../../scripts/api'

test.cb('get Data connecting to server', t => {
  var expected = { test: 'test passed' }
  var scope = nock('http://localhost:80')
    .get('/getData')
    .reply(200, expected)

  api.makeDataRequest((actual, err) => {
    t.is(actual.test, expected.test)
    t.is(err, null)
    scope.done()
    t.end()
  })
})

test.cb('get Data returning an object with length > 0', t => {
  nock.restore()
  api.makeDataRequest((actual, err) => {
    console.log(actual)
    t.not(actual.length, 0)
    t.end()
  })
})
