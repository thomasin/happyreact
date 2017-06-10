import { sendLoginRequest, sendLogoutRequest, createAccountRequest, checkLoginSession } from '../scripts/loginApi'

export const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST',
    isAuthenticated: false,
    isFetching: true
  }
}

export const loginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    isFetching: false
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

export const emailFail = (msg) => {
  return {
    type: 'EMAIL_FAIL',
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
    dispatch(loginRequest())
    sendLoginRequest(email, password, (err, res) => {
      if (err) {
        if (err.status === 401) dispatch(loginFail("Incorrect email or password"))
        else dispatch(loginFail("Something went wrong ): Please try again"))
      }
      else {
        dispatch(loginSuccess())
        callback()
      }
    })
  }
}

export function createAccount (email, password, callback) {
  return (dispatch) => {
    createAccountRequest(email, password, (err, res) => {
      if (err) {
        if (err.status === 409) dispatch(emailFail("That email already has an account, try logging in"))
        else dispatch(emailFail("Something went wrong ): Please try again"))
      }
      else {
        dispatch(loginSuccess())
        callback()
      }
    })
  }
}

export function attemptLogout (callback) {
  return (dispatch) => {
    sendLogoutRequest((err, res) => {
        dispatch(logoutSuccess())
        callback()
      })
  }
}

export function checkSession () {
  return (dispatch) => {
    checkLoginSession((err, res) => {
      if (!err) {
        dispatch(loginSuccess())
      }
    })
  }
}
