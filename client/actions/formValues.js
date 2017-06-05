function copyVariables (variables) {
  return variables.map((variable) => {
    return Object.assign({}, variable, {
      value: '',
      disabled: false
    })
  })
}

export const initialiseVariables = (variables) => {
  return {
    type: 'INITIALISE_VARIABLES',
    variables: copyVariables(variables)
  }
}

export const newVariableValue = (variableName, variableValue) => {
  return {
    type: 'UPDATE_VALUE',
    variableName,
    variableValue
  }
}

export const setValid = (variableName, bool) => {
  return {
    type: 'SET_VALID',
    variableName,
    bool
  }
}

export const enableVariable = (variableName) => {
  return {
    type: 'ENABLE_VARIABLE',
    variableName
  }
}
export const disableVariable = (variableName) => {
  return {
    type: 'DISABLE_VARIABLE',
    variableName
  }
}
