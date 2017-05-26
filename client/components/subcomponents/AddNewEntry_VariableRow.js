import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable, addVariable} from '../../scripts/api'
import {validateVariableValues, variableValuesToolTipMessages} from '../../scripts/utils/validation'
import trim from 'trim'

class AddNewEntry_VariableRow extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.newVariable)
    this.state = {
      variables: props.variables,
      newVariable: props.newVariable,
      validated: props.validated,
      invalid: props.invalid
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      variables: newProps.variables,
      newVariable: newProps.newVariable,
      validated: newProps.validated,
      invalid: newProps.invalid
    })
  }

  submitVariable(e) {
    e.preventDefault()
    if (validateVariableValues.call(this, this.state.newVariable) && trim(this.state.newVariable) != '') { // Make sure submitted variable name is valid
      addVariable(this.state.newVariable.name, () => this.props.getVariables()) // Add to database
    }
  }


  displayVariables(variables) {
    return variables.map((variable) => {
      let variableClasses = variable.disabled ? 'variable invalid' : 'variable'
      return (
        <div className="three columns" key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input type="text" className={variableClasses} value={variable.value} name={variable.id} id={variable.name} onChange={(e) => this.props.updateVariables(e)} />
        </div>
      )
    })
  }

  render() {
    let newVariableClasses = this.state.newVariable.disabled ? 'leftInput invalid variable' : 'leftInput variable'
    return (
      <div className="row variableRow section">

        <div className={`twelve columns tooltip ${this.state.invalid.length ? '' : 'hidden'}`} >
          {variableValuesToolTipMessages[this.state.validated]}
        </div>

        {this.displayVariables(this.state.variables)}

        <div className="three columns">
          <label htmlFor="newVariable">~</label>
          <div className="together">
            <input type="text" name="newVariable" className={newVariableClasses} id="newVariable" placeholder="Add new variable" onChange={(e) => this.props.updateVariables(e)} value={this.state.newVariable.value}/>
            <button className="button rightInput" id="submitVariable" onClick={(e) => this.submitVariable(e)}>></button>
          </div>
        </div>
      </div>
    )
  }
}


export default AddNewEntry_VariableRow
