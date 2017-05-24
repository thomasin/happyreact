
module.exports = {
  getAll,
  joinTwo,
  joinTable,
  getNextEntry,
  getPrevEntry,
  getMoodData,
  addVariable,
  joinTableAll,
  preloadVariableValues,
  getAllData,
  convertCreatedToDate
}

// ----- Re-usable ----- //

function getAll(connection, tableName) {
  return connection(tableName)
    .select()
}

function convertCreatedToDate(entries) {
  return entries.forEach((entry) => {
    entry.created_at = new Date(entry.created_at).toDateString()
  })
}

// ----- Create entry ----- //

function preloadVariableValues(variables, data) {
  for (const pair of Object.entries(data)) {
    var matchingVar = variables.find((row) => {
      return row.id == pair[0]
    })
    if (matchingVar) { matchingVar.value = pair[1] }
  }
}

function addVariable(connection, newVariable) {
  return connection('variable')
    .insert({
      name: newVariable,
      type: 'integer'
    })
}

// ----- Data to pass to d3 ----- //

function getMoodData(connection) {
  return connection('entry')
    .join('mood', 'mood_id', '=', 'mood.id')
    .select('entry.id', 'entry.created_at as date', 'energy', 'outlook')
}

function getAllData(connection) {
  return new Promise((resolve, reject) => {
    getMoodData(connection) // Get mood for each entry
      .then((data) => {
        joinTableAll(connection) // List of variables that correspond to each entry
          .then((variableData) => {
            getAll(connection, 'variable') // List of all possible variables
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

function pivotTable(moodData, variableData, variableList) {
  moodData.forEach((entry) => {
    variableList.forEach((variable) => {
      var correspondingVal = variableData.find((row) => {
        return row.entry_id == entry.id && row.variable_id == variable.id
      })
      if (correspondingVal) { entry[correspondingVal.name] = correspondingVal.value }
      else (entry[variable.name] = 0)
    })
  })
}

// ----- Joining ----- //

function joinTableAll(connection) {
  return connection('entry_variable')
    .join('variable', 'entry_variable.variable_id', '=', 'variable.id')
    .select('entry_variable.entry_id as entry_id', 'variable.id as variable_id', 'entry_variable.value as value', 'variable.name as name')
}

function joinTwo(connection, id, table1, table2) {
  return connection(table1)
    .join(table2, `${table1}.${table2}_id`, '=', `${table2}.id`)
    .where(`${table1}.id`, id)
    .select('energy', 'outlook', 'entry.*')
    .first()
}

function joinTable(connection, id) {
  return connection('entry_variable')
    .join('variable', 'entry_variable.variable_id', '=', 'variable.id')
    .where('entry_variable.entry_id', id)
}

// ----- View page ----- //

function getNextEntry(connection, id) {
  return connection('entry')
    .where('entry.id', '>', id)
    .first()
}

function getPrevEntry(connection, id) {
  return connection('entry')
    .where('entry.id', '<', id)
    .then((result) => {
      return last(result)
    })
}

function last(input) {
  return input[input.length-1]
}
