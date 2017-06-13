const validator = require('validator')
const zxcvbn = require('zxcvbn')
const { duplicateEmailCheck } = require('../client/scripts/loginApi')

function isValidEmail_signUp (email, callback) {
  if (email === '') {
    callback({
      valid: false,
      message: 'Please enter an email address'
    })
  } else if (!validator.isEmail(email)) {
    callback({
      valid: false,
      message: 'Not a valid email address'
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
      message: passwordObject.feedback.warning || 'Please make your password a little bit more complex'
    }
  }
  return {
    valid: true,
    strength: passwordObject.score,
    message: '~'
  }
}

function validateVariableValue (input, invalidList) {
  var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
  if (input.id === 'newVariable') {
    if (input.value.length > 20) {
      return { valid: false, msg: 'variableNameTooLong'}
    } else {
      return { valid: true }
    }
  } else {
    if (!allowedWords.includes(input.value.toLowerCase()) && isNaN(input.value)) {
      return { valid: false, msg: 'wrongType' }
    } else if (input.value.length > 5) {
      return { valid: false, msg: 'valueTooLong'}
    }
    return { valid: true }
  }
}

const variableValuesToolTipMessages = {
  wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
  valueTooLong: "Values can't be too big! We can't cope ):",
  variableNameTooLong: 'Variable name a bit long',
  default: ''
}

module.exports = {
  isValidEmail_signUp,
  isValidPassword_signUp,
  validateVariableValue,
  variableValuesToolTipMessages
}
