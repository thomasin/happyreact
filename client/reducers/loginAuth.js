function login (state = {isAuthenticated: localStorage.getItem("user_token") ? true : false, isFetching: false, userToken: localStorage.getItem("user_token") || null}, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {...state, isFetching: true}
    case 'LOGOUT_SUCCESS':
      return {isAuthenticated: false, isFetching: false, userToken:null}
    case 'LOGIN_SUCCESS':
      return {isFetching: false, isAuthenticated: true, userToken: action.userToken}
    case 'LOGIN_FAIL':
      return {isFetching: false, isAuthenticated: false, message: action.message}
    case 'CLEAR_MESSAGE':
      return {...state, message: null}
    default:
      return state
  }
}

export default login
