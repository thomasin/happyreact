function login (state = {isAuthenticated: false, isFetching: false}, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {...state, isFetching: true}
    case 'LOGOUT_SUCCESS':
      return {isAuthenticated: false, isFetching: false, userToken: null}
    case 'LOGIN_SUCCESS':
      return {isFetching: false, isAuthenticated: true}
    case 'LOGIN_FAIL':
      return {isFetching: false, isAuthenticated: false, message: action.message}
    case 'EMAIL_FAIL':
      return {isFetching: false, isAuthenticated: false, signUpEmailError: action.message}
    case 'CLEAR_MESSAGE':
      return {...state, message: null}
    default:
      return state
  }
}

export default login
