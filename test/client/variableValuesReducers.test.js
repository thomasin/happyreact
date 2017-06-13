import test from 'ava'

import { initialiseVariables, newVariableValue, reset } from '../../client/actions/formValues'
import variableValues from '../../client/reducers/addEntry/variableValues'


test('Default variables state', t => {
  let state = variableValues()
  t.is(state[0], undefined)
})

test('Initialise variables returns objects added onto state', t => {
  let state = [{ id: 5, name: "Already here", value: '', disabled: false }]
  let newState = variableValues(state, initialiseVariables([{ id: 1, name: "test1"}, { id: 2, name: "test2"}, { id: 3, name: "test3"}]))
  t.is(newState[1].value, '')
  t.is(newState[1].id, 1)
  t.is(newState[1].disabled, false)
})

test('Initialise variables on duplicate objects only returns new ones', t => {
  let state = [{ id: 5, name: "Already here", value: '', disabled: false }]
  let newState = variableValues(state, initialiseVariables([{ id: 5, name: "Already here", value: '', disabled: false }, { id: 1, name: "test1"}, { id: 2, name: "test2"}, { id: 3, name: "test3"}]))
  t.is(newState[0].id, 5)
  t.is(newState[1].id, 1)
  t.is(newState[2].id, 2)
  t.is(newState[3].id, 3)
})

test('Update value returns object correctly updated', t => {
  let state = [{ id: 5, name: "Already here", value: '', disabled: false }, { id: 1, name: "test1"}, { id: 2, name: "test2"}, { id: 3, name: "test3"}]
  let newState = variableValues(state, newVariableValue("Already here", "Updated", true))
  let updatedVar = newState.find((variable) => {
    return variable.name === "Already here"
  })
  t.is(updatedVar.id, 5)
  t.is(updatedVar.value, "Updated")
  t.is(updatedVar.disabled, true)
})

test('Reset values wipes all values and disabled', t => {
  let state = [
    { id: 5, name: "Already here", value: '3', disabled: false },
    { id: 1, name: "test1", value: 'i value', disabled: true},
    { id: 2, name: "test2", value: 'he', disabled: true},
    { id: 3, name: "test3", value: 'test', disabled: true}]
  let newState = variableValues(state, reset())
  newState.forEach((variable) => {
    t.is(variable.value, '')
    t.is(variable.disabled, false)
  })
})
