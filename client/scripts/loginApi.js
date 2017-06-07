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

export function sendLogoutRequest (callback) {
  request
    .get('/logout')
    .end(callback)
}
