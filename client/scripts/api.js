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
    .send({variableName})
    .end((err, res) => {
      if (err) { callback(err) }
      else { callback() }
    })
}

export function submitEntry (entryData, callback) {
  let body = parseEntryText(entryData.entry)
  request
    .post('/add-entry')
    .send({
      'title': body.title || '',
      'text': body.text || '',
      'mood_id': parseInt(entryData.energy + entryData.outlook),
      'variables': entryData.variables
    })
    .end((err, res) => {
      if (err) { callback(err) }
      else { callback() }
    })
}

function parseEntryText(text) {
  let title = ''
  let body = ''
  if (text.indexOf('\n') < 50) {
    title = text.substring(0,text.indexOf("\n"))
    body = text.substring(text.indexOf("\n"))
  } else {
    title = text.substring(0, 47) + '...'
    body = '...' + text.substring(47)
  }
  return {
    title: title,
    text: body
  }
}
