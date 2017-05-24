import request from 'superagent'

export function makeDataRequest (callback) {
  request
    .get('/getData')
    .end((err, res) => {
      if (err) { console.log(err) }
      else {
        callback(res, err)
      }
    })
}

export function getAllOfTable (tableName, callback) {
  request
    .get(`/getAll?tableName=${tableName}`)
    .end((err, res) => {
      if (err) { console.log(err) }
      else {
        callback(res.body, err)
      }
    })
}

export function addVariable (variableName, callback) {
  request
    .post('/add-variable')
    .send(variableName)
    .end((err, res) => {
      if (err) { callback(err) }
      else { callback() }
    })
}
