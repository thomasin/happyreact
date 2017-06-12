const validator = require('validator')
const zxcvbn = require('zxcvbn')
const { duplicateEmailCheck } = require('../client/scripts/loginApi')

function isValidEmail_signUp (email, callback) {
  if (email === '') {
    callback({
      valid: false,
      message: "Please enter an email address"
    })
  } else if (!validator.isEmail(email)) {
    callback({
      valid: false,
      message: "Not a valid email address"
    })
  } else {
    callback({
      valid: true
    })
  }
}

function isValidPassword_signUp (password) {
  if (password === '') {
    return {
      valid: false,
      strength: undefined,
      message: 'Please enter a password'
    }
  }

  let passwordObject = zxcvbn(password)
  if (passwordObject.score === 0) {
    return {
      valid: false,
      strength: passwordObject.score,
      message: passwordObject.feedback.warning || "Please make your password a little bit more complex"
    }
  }
  return {
    valid: true,
    strength: passwordObject.score,
    message: '~'
  }
}

module.exports = {
  isValidEmail_signUp,
  isValidPassword_signUp
}
