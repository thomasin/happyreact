import {combineReducers} from 'redux'

import variables from './variables'
import variableValues from './addEntry/variableValues'
import invalid from './addEntry/invalidArray'

export default combineReducers({
  variables,
  variableValues,
  invalid
})
