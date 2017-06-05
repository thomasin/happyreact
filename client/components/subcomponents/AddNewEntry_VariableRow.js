import React from 'react'
import {connect} from 'react-redux'

import { initialiseVariables } from '../../actions/formValues'
import { getVariables } from '../../actions/variables'
import {addVariable} from '../../scripts/api'
import {validateVariableValues, variableValuesToolTipMessages} from '../../scripts/utils/validation'
import trim from 'trim'

class VariableRow extends React.Component {
  constructor (props) {
    props.dispatch(initialiseVariables(props.variables))
    super(props)
    this.state = {
      newVariable: {
        name: 'newVariable',
        value: '',
        disabled: false
      },
      validated: props.validated,
      invalid: props.invalid
    }
  }

  submitVariable (e) {
    e.preventDefault()
    if (validateVariableValues.call(this, this.state.newVariable) && trim(this.state.newVariable.value) !== '') { // Make sure submitted variable name is valid
      addVariable(this.state.newVariable.value, () => { // Add to database
        this.updateVariableList() // Display new variable in list
      })
    }
  }

  updateVariableList() {
    this.props.dispatch(getVariables())  // Get new variable from database
      .then((result) => {
        this.props.dispatch(initialiseVariables([ // Initialise new variable
          this.props.variables.find((v) => {
          return v.name === this.state.newVariable.value
          })
        ])
      )})
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

  updateNewVariable (e) {
    this.setState({
      newVariable: {...this.state.newVariable, value: e.target.value}
    })
  }

  displayVariables (variables) {
    return variables.map((variable) => {
      let variableClasses = variable.disabled ? 'variable invalid' : 'variable'
      return (
        <div className='three columns' key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input
            type='text'
            className={variableClasses}
            value={variable.value}
            name={variable.id}
            id={variable.name}
            onChange={(e) => this.props.updateVariables(e)} />
        </div>
      )
    })
  }

  validateEach () {
    var inputs = [...this.state.variables, this.state.newVariable]
    Array.from(inputs).forEach((input) => {
      validateVariableValues.call(this, input)
    })
  }

  render () {
    let newVariableClasses = this.state.newVariable.disabled ? 'leftInput invalid variable' : 'leftInput variable'
    return (
      <div className='row variableRow section'>

        <div className={`twelve columns tooltip ${this.state.invalid.length ? '' : 'hidden'}`} >
          {variableValuesToolTipMessages[this.state.validated]}
        </div>

        {this.displayVariables(this.props.variableValues)}

        <div className='three columns'>
          <label htmlFor='newVariable'>~</label>
          <div className='together'>
            <input
              type='text'
              name='newVariable'
              className={newVariableClasses}
              id='newVariable'
              placeholder='Add new variable'
              onChange={(e) => this.updateNewVariable(e)}
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
