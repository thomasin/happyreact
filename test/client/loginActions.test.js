import test from 'ava'
import nock from 'nock'
import * as login from '../../client/actions/loginAuth'

test.cb('Attempt login not valid email or password', t => {
  const scope = nock('http://localhost:80')
    .post('/login')
    .reply(401)
  let called = 0
  login.attemptLogin("email", "password", () => {})((dispatch) => {
    called++
    if (called === 1) {
      t.is(dispatch.type, 'LOGIN_REQUEST')
    } else {
      t.is(dispatch.type, 'LOGIN_FAIL')
      t.is(dispatch.message, 'Incorrect email or password')
      t.end()
    }
  })
})

test.cb('Attempt login unknown server error', t => {
  const scope = nock('http://localhost:80')
    .post('/login')
    .reply(500)
  let called = 0
  login.attemptLogin("email", "password", () => {})((dispatch) => {
    called++
    if (called === 1) {
      t.is(dispatch.type, 'LOGIN_REQUEST')
    } else {
      t.is(dispatch.type, 'LOGIN_FAIL')
      t.is(dispatch.message, 'Something went wrong ): Please try again')
      t.end()
    }
  })
})

test.cb('Attempt login not verified', t => {
  const scope = nock('http://localhost:80')
    .post('/login')
    .reply(200,
      { verified: false }
    )
  let called = 0
  login.attemptLogin("email", "password", () => {})((dispatch) => {
    called++
    if (called === 1) {
      t.is(dispatch.type, 'LOGIN_REQUEST')
    } else {
      t.is(dispatch.type, 'LOGIN_FAIL')
      t.is(dispatch.message, 'Please verify your account')
      t.end()
    }
  })
})

test.cb('Attempt login success', t => {
  const scope = nock('http://localhost:80')
    .post('/login')
    .reply(200,
      {verified: true}
    )
  let called = 0
  login.attemptLogin("email", "password", () => {})((dispatch) => {
    called++
    if (called === 1) {
      t.is(dispatch.type, 'LOGIN_REQUEST')
    } else {
      t.is(dispatch.type, 'LOGIN_SUCCESS')
      t.end()
    }
  })
})

test.cb('Create account email already exists', t => {
  const scope = nock('http://localhost:80')
    .post('/signup')
    .reply(409)

  login.createAccount("email", "password", () => {})((dispatch) => {
      t.is(dispatch.type, 'EMAIL_FAIL')
      t.is(dispatch.message, 'That email already has an account, try logging in')
      t.end()
  })
})

test.cb('Create account internal server error', t => {
  const scope = nock('http://localhost:80')
    .post('/signup')
    .reply(500)

  login.createAccount("email", "password", () => {})((dispatch) => {
      t.is(dispatch.type, 'EMAIL_FAIL')
      t.is(dispatch.message, 'Something went wrong ): Please try again')
      t.end()
  })
})

test.cb('Create account success', t => {
  const scope = nock('http://localhost:80')
    .post('/signup')
    .reply(200)

  login.createAccount("email", "password", () => {})((dispatch) => {
      t.is(dispatch.type, 'LOGIN_SUCCESS')
      t.end()
  })
})

test.cb('Logout success', t => {
  const scope = nock('http://localhost:80')
    .get('/logout')
    .reply(200)

  login.attemptLogout(() => {})((dispatch) => {
      t.is(dispatch.type, 'LOGOUT_SUCCESS')
      t.end()
  })
})

test.cb('Check active session', t => {
  const scope = nock('http://localhost:80')
    .get('/activeSession')
    .reply(200)

  login.checkSession()((dispatch) => {
      t.is(dispatch.type, 'LOGIN_SUCCESS')
      t.end()
  })
})
