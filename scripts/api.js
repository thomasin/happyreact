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

export function submitEntry (entryData, callback) {
  let title = ''
  let text = ''
  if (entryData.entry.indexOf('\n') < 50) {
    title = entryData.entry.substring(0,entryData.entry.indexOf("\n"))
    text = entryData.entry.substring(entryData.entry.indexOf("\n"))
  } else {
    title = entryData.entry.substring(0, 47) + '...'
    text = '...' + entryData.entry.substring(47)
  }
  request
    .post('/add-entry')
    .send({
      'title': title || '',
      'text': text || '',
      'mood_id': parseInt(entryData.energy + entryData.outlook),
      'variables': entryData.variables
    })
    .end((err, res) => {
      if (err) { callback(err) }
      else { callback(res) }
    })
}
