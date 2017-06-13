import test from 'ava'

import index from '../../client/reducers/index'


test('Index successfully combines all reducers', t => {
  t.not(index().variables, undefined)
  t.not(index().variableValues, undefined)
  t.not(index().login, undefined)
  t.not(index().entries, undefined)
  t.not(index().invalid, undefined)
})
