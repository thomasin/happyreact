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
