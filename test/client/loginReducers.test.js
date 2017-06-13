import test from 'ava'

import { loginRequest, loginSuccess, loginFail, emailFail, clearError } from '../../client/actions/loginAuth'
import login from '../../client/reducers/loginAuth'


test('Default login state', t => {
  let state = login()
  t.is(state.isFetching, false)
  t.is(state.isAuthenticated, false)
  t.is(state.message, undefined)
  t.is(state.signUpEmailError, undefined)
})

test('Login request state', t => {
  let state = { isFetching: false, isAuthenticated: false }
  let newState = login(state, loginRequest())
  t.is(newState.isFetching, true)
  t.is(newState.isAuthenticated, false)
  t.is(newState.message, undefined)
  t.is(newState.signUpEmailError, undefined)
})

test('Login success state', t => {
  let state = { isFetching: true, isAuthenticated: false }
  let newState = login(state, loginSuccess())
  t.is(newState.isFetching, false)
  t.is(newState.isAuthenticated, true)
  t.is(newState.message, undefined)
  t.is(newState.signUpEmailError, undefined)
})

test('Login fail state', t => {
  let state = { isFetching: true, isAuthenticated: false }
  let newState = login(state, loginFail("I am a test message"))
  t.is(newState.isFetching, false)
  t.is(newState.isAuthenticated, false)
  t.is(newState.message, "I am a test message")
  t.is(newState.signUpEmailError, undefined)
})

test('Email fail state', t => {
  let state = { isFetching: false, isAuthenticated: false }
  let newState = login(state, emailFail("I am a test message"))
  t.is(newState.isFetching, false)
  t.is(newState.isAuthenticated, false)
  t.is(newState.signUpEmailError, "I am a test message")
  t.is(newState.message, undefined)
})

test('Clear error state', t => {
  let state = { isFetching: false, isAuthenticated: false, message: "I'm here to be cleared" }
  let newState = login(state, clearError())
  t.is(newState.isFetching, false)
  t.is(newState.isAuthenticated, false)
  t.is(newState.message, null)
  t.is(newState.signUpEmailError, undefined)
})
