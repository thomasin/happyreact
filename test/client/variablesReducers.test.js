import test from 'ava'

import { refreshVariables } from '../../client/actions/variables'
import variables from '../../client/reducers/variables'


test('Default variables state', t => {
  let state = variables()
  t.is(state[0], undefined)
})

test('Refresh variables state', t => {
  let state = []
  let newState = variables(state, refreshVariables([{ id: 1, name: "test1"}, { id: 2, name: "test2"}, { id: 3, name: "test3"}]))
  t.is(newState[0].id, 1)
})
