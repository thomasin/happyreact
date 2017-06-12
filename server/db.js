
module.exports = {
  getAll,
  addVariable,
  getAllData,
  addEntry,
  addVariableEntry,
  getEntry,
  getVariablesForEntry,
  getTable
}

// ----- Re-usable ----- //

function getAll (connection, tableName, userId) {
  return connection(tableName)
    .select()
    .where('user_id', userId)
}

function getTable (connection, tableName) {
  return connection(tableName)
}

// ----- Create entry ----- //

function getEntry (connection, id) {
  return connection('entry')
    .where('id', id)
    .first()
}

function getVariablesForEntry (connection, id) {
  return connection('entry_variable')
    .where('entry_id', id)
}

function addEntry (connection, entryData, userId) {
  return connection('entry')
    .insert({
      user_id: userId,
      title: entryData.title,
      text: entryData.text,
      mood_id: entryData.mood_id
    })
}

function addVariableEntry (connection, variable, entryId) {
  let variableObj = {
    'y': '1',
    'yes': '1',
    'true': '1',
    'n': '0',
    'no': '0',
    'false': '0',
    '': '0'
  }

  if (isNaN(variable.value) || variable.value === '') {
    variable.value = variableObj[variable.value] || '0'
  }

  return connection('entry_variable')
    .insert({
      entry_id: entryId,
      variable_id: variable.id,
      value: parseInt(variable.value)
    })
}

function addVariable (connection, newVariable, userId) {
  return connection('variable')
    .insert({
      user_id: userId,
      name: newVariable,
      type: 'integer'
    })
}

// ----- Data to pass to d3 ----- //

function getMoodData (connection, userId) {
  return connection('entry')
    .where('entry.user_id', userId)
    .join('mood', 'mood_id', '=', 'mood.id')
    .select('entry.id', 'entry.created_at as date', 'energy', 'outlook')
}

function getAllData (connection, userId) {
  return new Promise((resolve, reject) => {
    getMoodData(connection, userId) // Get mood for each entry
      .then((data) => {
        joinTableAll(connection, userId) // List of variables that correspond to each entry
          .then((variableData) => {
            getAll(connection, 'variable', userId) // List of all possible variables
              .then((variableArray) => {
                pivotTable(data, variableData, variableArray)
                let variableList = variableArray.map((variable) => variable.name)
                resolve({data, variableList})
              })
          })
      })
      .catch(resolve)
  })
}

function pivotTable (moodData, variableData, variableList) {
  moodData.forEach((entry) => {
    variableList.forEach((variable) => {
      var correspondingVal = variableData.find((row) => {
        return row.entry_id === entry.id && row.variable_id === variable.id
      })
      if (correspondingVal) {
        entry[correspondingVal.name] = correspondingVal.value
      } else entry[variable.name] = 0
    })
  })
}

// ----- Joining ----- //

function joinTableAll (connection, userId) {
  return connection('entry_variable')
    .join('variable', 'entry_variable.variable_id', '=', 'variable.id')
    .where('variable.user_id', userId)
    .select('entry_variable.entry_id as entry_id', 'variable.id as variable_id', 'entry_variable.value as value', 'variable.name as name')
}
