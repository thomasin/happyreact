function invalid (state = [], action) {
  switch (action.type) {
    case 'VALIDATE_VARIABLE':
      return action.bool
      ? [ ...state, action.variableName ]
      : state.filter((v) => v !== action.variableName)
    default:
      return state
  }
}

export default invalid
