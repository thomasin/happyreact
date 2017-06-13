function entries (state = [], action = {}) {
  switch (action.type) {
    case 'GET_ENTRIES':
      return [...action.entries]
    default:
      return state
  }
}

export default entries
