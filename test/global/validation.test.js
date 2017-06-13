import test from 'ava'

import * as validate from '../../utils/validation'

test.cb('isValidEmail_signUp returns correct object for non entered email', t => {
  validate.isValidEmail_signUp('', (res) => {
    t.is(res.valid, false)
    t.is(res.message, 'Please enter an email address')
    t.end()
  })
})

test.cb('isValidEmail_signUp returns correct object for non valid email', t => {
  validate.isValidEmail_signUp('notvalidemail', (res) => {
    t.is(res.valid, false)
    t.is(res.message, 'Not a valid email address')
    t.end()
  })
})

test.cb('isValidEmail_signUp returns correct object for valid email', t => {
  validate.isValidEmail_signUp('testing@test.com', (res) => {
    t.is(res.valid, true)
    t.is(res.message, undefined)
    t.end()
  })
})

test('isValidPassword_signUp returns correct object for valid password', t => {
  let passwordObject = validate.isValidPassword_signUp('i am a complex password')
  t.is(passwordObject.valid, true)
  t.is(passwordObject.message, '~')
  t.not(passwordObject.strength, 0)
})

test('isValidPassword_signUp returns correct object for not valid password', t => {
  let passwordObject = validate.isValidPassword_signUp('test')
  t.is(passwordObject.valid, false)
  t.is(passwordObject.message, 'This is a top-100 common password')
  t.is(passwordObject.strength, 0)
})

test('validateVariableValues returns correct object for not valid value', t => {
  let variableObject = validate.validateVariableValue({ value: 'notvalid', id: 'test' })
  t.is(variableObject.valid, false)
  t.is(variableObject.msg, 'wrongType')
})

test('validateVariableValues returns correct object for too long value', t => {
  let variableObject = validate.validateVariableValue({ value: '123456', id: 'test' })
  t.is(variableObject.valid, false)
  t.is(variableObject.msg, 'valueTooLong')
})

test('validateVariableValues returns correct object for too long new variable name', t => {
  let variableObject = validate.validateVariableValue({ value: 'notvalidbecauseiamabittoolong', id: 'newVariable' })
  t.is(variableObject.valid, false)
  t.is(variableObject.msg, 'variableNameTooLong')
})

test('validateVariableValues returns correct object for valid value', t => {
  let variableObject = validate.validateVariableValue({ value: '23', id: 'test' })
  t.is(variableObject.valid, true)
  t.is(variableObject.msg, undefined)
})

test('validateVariableValues returns correct object for valid new variable', t => {
  let variableObject = validate.validateVariableValue({ value: 'test', id: 'newVariable' })
  t.is(variableObject.valid, true)
  t.is(variableObject.msg, undefined)
})
