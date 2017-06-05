function variableValues (state = [], action) {
  switch (action.type) {
    case 'INITIALISE_VARIABLES':
      return [...state, ...action.variables]
    default:
      return state
  }
}

export default variableValues
