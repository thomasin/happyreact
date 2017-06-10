import request from 'superagent'

export function sendLoginRequest (email, password, callback) {
  request
    .post('/login')
    .send({
      email,
      password
    })
    .end(callback)
}

export function checkLoginSession (callback) {
  request
    .get('/activeSession')
    .end(callback)
}

export function sendLogoutRequest (callback) {
  request
    .get('/logout')
    .end(callback)
}

export function createAccountRequest (email, password, callback) {
  request
    .post('/signup')
    .send({
      email,
      password
    })
    .end(callback)
}

export function duplicateEmailCheck (email, callback) {
  request
    .post('/checkEmail')
    .send({
      email
    })
    .end(callback)
}
