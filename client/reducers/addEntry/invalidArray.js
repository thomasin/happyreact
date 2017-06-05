function invalid (state = [], action) {
  switch (action.type) {
    case 'ENABLE_VARIABLE':
      return state.filter((v) => v !== action.variableName)
    case 'DISABLE_VARIABLE':
      return [ ...state, action.variableName ]
    default:
      return state
  }
}

export default invalid
