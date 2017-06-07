function login (state = {isAuthenticated: false, isFetching: false, user_id: null}, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      console.log("LOGIN REQUEST")
      return {...state, isFetching: true}
    case 'LOGIN_SUCCESS':
      console.log("LOGIN SUCCESS")
      return {isFetching: false, isAuthenticated: true, userToken: action.userToken}
    case 'LOGIN_FAIL':
      console.log("LOGIN FAIL")
      console.log(action.message)
      return {isFetching: false, isAuthenticated: false, message: action.message}
    default:
      return state
  }
}

export default login
