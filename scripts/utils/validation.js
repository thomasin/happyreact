export function validateVariableValues(e) {
var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
  if (e.name == 'newVariable') {
    if (e.value.length > 20) {
      e.classList.add('invalid')
      this.setState({ validated: 'variableNameTooLong' })
      return false
    } else {
      e.classList.remove('invalid')
      return true
    }
  } else {
    if (!allowedWords.includes(e.value.toLowerCase()) && isNaN(e.value)) {
      e.classList.add('invalid')
      this.setState({ validated: 'wrongType'})
    } else if (e.value.length > 5){
      e.classList.add('invalid')
      this.setState({ validated: 'valueTooLong' })
    } else {
      e.classList.remove('invalid')
    }
  }
}

export const variableValuesToolTipMessages = {
  wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
  valueTooLong: "Values can't be too big! We can't cope ):",
  variableNameTooLong: "Variable name a bit long",
  default: ''
}
