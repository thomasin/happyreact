var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../../server/db')

test('getAllData returns array with at least id, date and mood', t => {
  return db.getAllData(t.context.connection)
    .then(function(result) {
      t.not(result.data[0].date, undefined)
      t.not(result.data[0].id, undefined)
      t.not(result.data[0].outlook, undefined)
      t.not(result.data[0].energy, undefined)
    })
})

test('getAll returns a different array depending on tableName', t => {
  return db.getAll(t.context.connection, 'entry')
    .then((entryResults) => {
      return db.getAll(t.context.connection, 'variable')
        .then((variableResults) => {
          t.not(entryResults[0].id, variableResults[0].id)
        })
    })
})
