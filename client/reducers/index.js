import {combineReducers} from 'redux'

import variables from './variables'
import login from './loginAuth'
import entries from './entries'
import variableValues from './addEntry/variableValues'
import invalid from './addEntry/invalidArray'

export default combineReducers({
  variables,
  variableValues,
  invalid,
  entries,
  login
})
