import React from 'react'
import {connect} from 'react-redux'
import { initialiseVariables, newVariableValue, setValid, invalidArray } from '../../actions/formValues'
import { getVariables } from '../../actions/variables'
import {addVariable} from '../../scripts/api'
const v = require('../../../utils/validation')
import trim from 'trim'

class VariableRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newVariable: {
        name: 'newVariable',
        value: '',
        disabled: false
      },
      validated: ''
    }
  }

  submitVariable (e) {
    e.preventDefault()
    if (!v.validateVariableValue(this.state.newVariable).valid && trim(this.state.newVariable.value) !== '') { // Make sure submitted variable name is valid
      addVariable(this.state.newVariable.value, () => { // Add to database
        this.updateVariableList() // Display new variable in list
      })
    }
  }

  updateVariableList () { // ANY WAY TO MAKE THIS MORE CONCISE ????
    this.props.dispatch(getVariables((variables) => {
      this.props.dispatch(initialiseVariables(variables))
    }))  // Get new variable from database
    .then(() => {
      this.setState({ // Reset new variable input
        newVariable: {
          name: 'newVariable',
          value: '',
          disabled: false
        }
      })
    })
  }

  displayVariables (variables) {
    return variables.map((variable) => {
      return (
        <div className='' key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input
            type='text'
            className={`variable ${variable.disabled ? 'invalid' : ''}`}
            value={variable.value}
            name={variable.id}
            id={variable.name}
            onChange={(e) => this.validate(e.target)} />
        </div>
      )
    })
  }

  validate (input) {
    let validResult = v.validateVariableValue(input, this.props.invalid) // Check if entered value is valid
    this.updateVariable(input, !validResult.valid) // Update variable
    this.props.dispatch(invalidArray(input.id, !validResult.valid)) // Update invalid array
    if (validResult.msg) this.setState({validated: validResult.msg }) // Display correct invalid message
  }

  updateVariable (input, bool) {
    input.id === 'newVariable'
    ? this.setState({ newVariable: { ...this.state.newVariable, disabled: bool, value: input.value } })
    : this.props.dispatch(newVariableValue(input.id, input.value, bool))
  }

  render () {
    return (
      <div className='variableRow section'>

        <div className={`twelve columns tooltip ${this.props.invalid.length ? '' : 'hidden'}`} >
          {v.variableValuesToolTipMessages[this.state.validated]}
        </div>

        {this.displayVariables(this.props.variableValues)}

        <div className=''>
          <label htmlFor='newVariable'>~</label>
          <div className='together'>
            <input
              type='text'
              className={`leftInput variable ${this.state.newVariable.disabled ? 'invalid' : ''}`}
              id='newVariable'
              placeholder='Add new variable'
              onChange={(e) => this.validate(e.target)}
              value={this.state.newVariable.value} />
            <button className='button rightInput' id='submitVariable' onClick={(e) => this.submitVariable(e)}>></button>
          </div>
        </div>
      </div>
    )
  }
}

VariableRow = connect()(VariableRow)
export default VariableRow
