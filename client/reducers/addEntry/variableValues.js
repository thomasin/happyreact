function variableValues (state = [], action) {
  switch (action.type) {
    case 'INITIALISE_VARIABLES':
      return [...state, ...action.variables]
    case 'UPDATE_VALUE':
      return state.map((v) => {
        if (v.name === action.variableName) {
          return { ...v, value: action.variableValue}
        }
        return v
      })
    case 'SET_VALID':
      return state.map((v) => {
        if (v.name === action.variableName) {
          return { ...v, disabled: action.bool}
        }
        return v
      })
    default:
      return state
  }
}

export default variableValues
