var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../../server/db')

test('getAllData returns array with at least id, date and mood', t => {
  return db.getAllData(t.context.connection, 203)
    .then((result) => {
      t.not(result.data[0].date, undefined)
      t.not(result.data[0].id, undefined)
      t.not(result.data[0].outlook, undefined)
      t.not(result.data[0].energy, undefined)
    })
})

test('getAll returns a different array depending on tableName', t => {
  return db.getAll(t.context.connection, 'entry', 203)
    .then((entryResults) => {
      return db.getAll(t.context.connection, 'variable', 203)
        .then((variableResults) => {
          t.not(entryResults[0].id, variableResults[0].id)
        })
    })
})

test('addVariable adds a new variable to the variable table', t => {
  return db.addVariable(t.context.connection, "I'm new!", 203)
    .then(() => {
      return db.getAll(t.context.connection, 'variable', 203)
        .then((variables) => {
          t.is(variables[variables.length - 1].name, "I'm new!")
        })
    })
})

test('addEntry adds a entry to the variable table', t => {
  let entry = {
    title: "I'm a test",
    text: 'Hello',
    mood_id: 33
  }
  return db.addEntry(t.context.connection, entry, 203)
    .then((id) => {
      return db.getAll(t.context.connection, 'entry', 203)
    })
    .then((entries) => {
      t.is(entries[entries.length - 1].title, entry.title)
    })
})

test('getEntry returns correct entry', t => {
  let entry = {
    title: "I'm a test",
    text: 'Hello',
    mood_id: 33
  }
  return db.addEntry(t.context.connection, entry, 203)
    .then((id) => {
      return db.getEntry(t.context.connection, id[0], 203)
    })
    .then((result) => {
      t.is(result.text, entry.text)
    })
})

test('getVariablesForEntry returns correct variables', t => {
  let variable = {
    variable_id: 2,
    value: '34'
  }
  let entryId = 1
  return db.addVariableEntry(t.context.connection, variable, entryId)
    .then(() => {
      return db.getVariablesForEntry(t.context.connection, entryId)
    })
    .then((result) => {
      t.is(result[0].value, parseInt(variable.value))
    })
})

test('addVariableEntry adds correctly', t => {
  let variable = {
    variable_id: 2,
    value: '34'
  }
  let entryId = 1
  return db.addVariableEntry(t.context.connection, variable, entryId)
    .then((id) => {
      return db.getTable(t.context.connection, 'entry_variable')
    })
    .then((result) => {
      t.is(result[result.length - 1].value, parseInt(variable.value))
    })
})
