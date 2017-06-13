import test from 'ava'

import { refreshEntries } from '../../client/actions/entries'
import entries from '../../client/reducers/entries'


test('Default entries state', t => {
  let state = entries()
  t.is(state[0], undefined)
})

test('Refresh entries state', t => {
  let state = []
  let newState = entries(state, refreshEntries([{ id: 1, name: "test1"}, { id: 2, name: "test2"}, { id: 3, name: "test3"}]))
  t.is(newState[0].id, 1)
})
