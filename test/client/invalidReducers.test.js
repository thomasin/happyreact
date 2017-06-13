import test from 'ava'

import { invalidArray } from '../../client/actions/formValues'
import invalid from '../../client/reducers/addEntry/invalidArray'


test('Default variables state', t => {
  let state = invalid()
  t.is(state[0], undefined)
})

test('Validate variable true state returns state added', t => {
  let state = []
  let newState = invalid(state, invalidArray("Test", true))
  t.is(newState[0], "Test")
})

test('Validate variable true state returns state filtered', t => {
  let state = ["Test", "Filterme"]
  let newState = invalid(state, invalidArray("Filterme", false))
  t.is(newState.includes("Filterme"), false)
  t.is(newState[0], "Test")
})
