import test from 'ava'
import nock from 'nock'
import * as variables from '../../client/actions/variables'
import * as formValues from '../../client/actions/formValues'

test.cb('Get variables', t => {
  const scope = nock('http://localhost:80')
    .get('/dashboard/getAll')
    .query({ tableName: 'variable' })
    .reply(200, { variables: [{test: 'testing'}] })

  variables.getVariables(() => {})((dispatch) => {
    t.is(dispatch.type, 'GET_VARIABLES')
    t.is(dispatch.variables[0].test, 'testing')
    t.end()
  })
})

test('Copy variables function succesfully adds keys', t => {
  let copied = formValues.copyVariables([{test: "testing"}, {test: "i test"} ])
  copied.forEach((variable) => {
    t.is(variable.value, '')
    t.is(variable.disabled, false)
  })
})
