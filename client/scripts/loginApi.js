const request = require('superagent')

function sendLoginRequest (email, password, callback) {
  request
    .post('/login')
    .send({
      email,
      password
    })
    .end(callback)
}

function checkLoginSession (callback) {
  request
    .get('/activeSession')
    .end(callback)
}

function sendLogoutRequest (callback) {
  request
    .get('/logout')
    .end(callback)
}

function createAccountRequest (email, password, callback) {
  request
    .post('/signup')
    .send({
      email,
      password
    })
    .end(callback)
}

function duplicateEmailCheck (email, callback) {
  return request
    .post('/checkEmail')
    .send({
      email
    })
    .end(callback)
}

module.exports = {
  sendLoginRequest,
  checkLoginSession,
  sendLogoutRequest,
  createAccountRequest,
  duplicateEmailCheck
}
