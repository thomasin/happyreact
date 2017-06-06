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

export const newVariableValue = (variableName, variableValue, bool) => {
  return {
        type: 'UPDATE_VALUE',
        variableName,
        variableValue,
        bool
  }
}

export const reset = (variableName, bool) => {
  return {
    type: 'RESET_VALUES'
  }
}

export const invalidArray = (variableName, bool) => {
  return {
    type: 'VALIDATE_VARIABLE',
    variableName,
    bool
  }
}
