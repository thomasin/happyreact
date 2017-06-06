export function validateVariableValues (input, invalidList) {
  var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
  if (input.name === 'newVariable') {
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
    } else {
      if (invalidList.includes(input.name)) {
        return { valid: true }
      }
      return { valid: true }
    }
  }
}

export const variableValuesToolTipMessages = {
  wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
  valueTooLong: "Values can't be too big! We can't cope ):",
  variableNameTooLong: 'Variable name a bit long',
  default: ''
}
