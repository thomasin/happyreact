export function validateVariableValues (input) {
  var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
  console.log(input)
  if (input.name === 'newVariable') {
    if (input.value.length > 20) {
      disableVariable.call(this, input.name, 'variableNameTooLong')
      return false
    } else {
      enableVariable.call(this, input.name)
      return true
    }
  } else {
    if (!allowedWords.includes(input.value.toLowerCase()) && isNaN(input.value)) {
      disableVariable.call(this, input.name, 'wrongType')
    } else if (input.value.length > 5) {
      disableVariable.call(this, input.name, 'valueTooLong')
    } else {
      if (this.state.invalid.includes(input.name)) {
        enableVariable.call(this, input.name)
      }
    }
  }
}

function enableVariable (vName) {
  setV.call(this, vName, false)
  this.state.invalid = this.state.invalid.filter((v) => v !== vName)
  set.call(this)
}

function disableVariable (vName, message) {
  setV.call(this, vName, true)
  this.state.invalid.push(vName)
  set.call(this, message)
}

function setV (vName, bool) {
  if (vName === 'newVariable') this.state.newVariable.disabled = bool
  else {
    let v = this.state.variables.find((v) => v.name === vName)
    v.disabled = bool
  }
}

function set (message) {
  if (message) this.state.validated = message
  this.setState({
    validated: this.state.validated,
    invalid: this.state.invalid,
    variables: this.state.variables,
    newVariable: this.state.newVariable})
}

export const variableValuesToolTipMessages = {
  wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
  valueTooLong: "Values can't be too big! We can't cope ):",
  variableNameTooLong: 'Variable name a bit long',
  default: ''
}
