function variables (state = [], action) {
  switch (action.type) {
    case 'GET_VARIABLES':
      return [...action.variables]
    default:
      return state
  }
}

export default variables
