const validator = require('validator')
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

module.exports = {isValidEmail_signUp}
