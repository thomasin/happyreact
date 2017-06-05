import { setValid, enableVariable, disableVariable } from '../../actions/formValues'

export function validateVariableValues (input) {
  var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
  if (input.name === 'newVariable') {
    if (input.value.length > 20) {
      failVariable.call(this, input.name, 'variableNameTooLong')
      return false
    } else {
      passVariable.call(this, input.name)
      return true
    }
  } else {
    if (!allowedWords.includes(input.value.toLowerCase()) && isNaN(input.value)) {
      failVariable.call(this, input.name, 'wrongType')
    } else if (input.value.length > 5) {
      failVariable.call(this, input.name, 'valueTooLong')
    } else {
      if (this.props.invalid.includes(input.name)) {
        passVariable.call(this, input.name)
      }
    }
  }
}

function passVariable (vName) {
  setV.call(this, vName, false)
  this.props.dispatch(enableVariable(vName))
  set.call(this)
}

function failVariable (vName, message) {
  setV.call(this, vName, true)
  this.props.dispatch(disableVariable(vName))
  set.call(this, message)
}

function setV (vName, bool) {
  if (vName === 'newVariable') this.setState({ ...newVariable, disabled: bool })
  else {
    this.props.dispatch(setValid(vName, bool))
  }
}

function set (message) {
  this.setState({validated: message})
}

export const variableValuesToolTipMessages = {
  wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
  valueTooLong: "Values can't be too big! We can't cope ):",
  variableNameTooLong: 'Variable name a bit long',
  default: ''
}
