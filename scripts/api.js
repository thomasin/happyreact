import request from 'superagent'

export function makeDataRequest (callback) {
  request
    .get('/getData')
    .end((err, res) => {
      if (err) { console.log(err) }
      else {
        callback(res)
      }
    })
}
