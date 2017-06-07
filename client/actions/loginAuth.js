import { sendLoginRequest, sendLogoutRequest } from '../scripts/loginApi'

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

export const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS',
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_MESSAGE',
    message: ''
  }
}

export function attemptLogin (email, password, callback) {
  return (dispatch) => {
    sendLoginRequest(email, password, (err, res) => {
      if (err) {
        if (err.status === 401) dispatch(loginFail("Incorrect email or password"))
        else dispatch(loginFail("Something went wrong ): Please try again"))
      }
      else {
        dispatch(loginSuccess(res.body.token))
        localStorage.setItem("user_token", res.body.token)
        callback()
      }
    })
  }
}

export function attemptLogout (callback) {
  return (dispatch) => {
    sendLogoutRequest((err, res) => {
      if (err) { console.log(err) }
      else {
        dispatch(logoutSuccess())
        localStorage.removeItem("user_token")
        callback()
      }
    })
  }
}
