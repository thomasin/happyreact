import {combineReducers} from 'redux'

import variables from './variables'
import variableValues from './addEntry/variableValues'

export default combineReducers({
  variables,
  variableValues
})
