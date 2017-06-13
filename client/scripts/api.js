import request from 'superagent'

export function makeDataRequest (callback) {
  request
    .get('/dashboard/getData')
    .end(callback)
}

export function getAllOfTable (tableName, callback) {
  request
    .get(`/dashboard/getAll`)
    .query({ tableName })
    .end(callback)
}

export function addVariable (variableName, callback) {
  request
    .post('/dashboard/add-variable')
    .send({variableName})
    .end((err, res) => {
      if (err) { callback(err) } else { callback() }
    })
}

export function submitEntry (entryData, variableData, callback) {
  let body = parseEntryText(entryData.entry)
  request
    .post('/dashboard/add-entry')
    .send({
      'title': body.title || '',
      'text': body.text || '',
      'mood_id': parseInt(entryData.energy + entryData.outlook),
      'variables': variableData
    })
    .end((err, res) => {
      if (err) { callback(err) } else { callback() }
    })
}

function parseEntryText (text) {
  let title = ''
  let body = ''
  if (text.indexOf('\n') < 50) {
    title = text.substring(0, text.indexOf('\n'))
    body = text.substring(text.indexOf('\n'))
  } else {
    title = text.substring(0, 47) + '...'
    body = '...' + text.substring(47)
  }
  return {
    title: title,
    text: body
  }
}
