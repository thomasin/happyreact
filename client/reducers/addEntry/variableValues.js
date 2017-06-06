function variableValues (state = [], action) {
  switch (action.type) {
    case 'INITIALISE_VARIABLES':
      return [...state, ...action.variables]
    case 'UPDATE_VALUE':
      return state.map((v) => {
        if (v.name === action.variableName) {
          return { ...v, value: action.variableValue, disabled: action.bool}
        }
        return v
      })
    default:
      return state
  }
}

export default variableValues
