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

export const updateVariable = (variable) => {
  return {
    type: 'UPDATE_VARIABLE',
    variableName: oldVariable,
    variableValue: variableValue
  }
}
