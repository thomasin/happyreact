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
