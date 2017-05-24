var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../../server/db')

test('getAllData returns array with at least id, date and mood', function (t) {
  return db.getAllData(t.context.connection)
    .then(function(result) {
      t.not(result.data[0].date, undefined)
      t.not(result.data[0].id, undefined)
      t.not(result.data[0].outlook, undefined)
      t.not(result.data[0].energy, undefined)
    })
})
