import { sendLoginRequest } from '../scripts/loginApi'

export const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST',
    isAuthenticated: false,
    isFetching: true
  }
}

export const loginSuccess = (id) => {
  return {
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    isFetching: false,
    userToken: id
  }
}

export const loginFail = (msg) => {
  return {
    type: 'LOGIN_FAIL',
    isAuthenticated: false,
    isFetching: false,
    message: msg
  }
}

export function attemptLogin (email, password) {
  return (dispatch) => {
    sendLoginRequest(email, password, (err, res) => {
      if (err) dispatch(loginFail("Something went wrong ):"))
      else {
        dispatch(loginSuccess(res.body.id))
      }
    })
  }
}
