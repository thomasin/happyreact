import test from 'ava'
import nock from 'nock'
import * as entries from '../../client/actions/entries'

test.cb('Get entries', t => {
  const scope = nock('http://localhost:80')
    .get('/dashboard/getAll')
    .query({ tableName: 'entry' })
    .reply(200, { entries: [{test: 'testing'}] })

  entries.getEntries(() => {})((dispatch) => {
    t.is(dispatch.type, 'GET_ENTRIES')
    t.is(dispatch.entries[0].test, 'testing')
    t.end()
  })
})
