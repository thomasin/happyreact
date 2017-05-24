import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable, addVariable} from '../../../scripts/api'
import {validateVariableValues, variableValuesToolTipMessages} from '../../../scripts/utils/validation'

class AddNewEntry_VariableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variables: props.variables,
      newVariable: props.newVariable,
      validated: props.validated
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      variables: newProps.variables,
      newVariable: newProps.newVariable,
      validated: newProps.validated
    })
  }

  submitVariable(e) {
    e.preventDefault()
    if (validateVariableValues.call(this, document.getElementById("newVariable")) && this.state.newVariable != '') { // Make sure submitted variable name is valid
      addVariable(this.state, () => this.props.getVariables()) // Add to database
    }
  }


  displayVariables(variables) {
    return variables.map((variable) => {
      return (
        <div className="three columns" key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input type="text" className="variable" value={variable.value} name={variable.id} id={variable.name} onChange={(e) => this.props.updateVariables(e)} />
        </div>
      )
    })
  }

  render() {
    let variableList = this.displayVariables(this.state.variables)
    return (
      <div className="row variableRow section">

        <div className={`twelve columns tooltip ${document.getElementsByClassName('invalid').length ? '' : 'hidden'}`} >
          {variableValuesToolTipMessages[this.state.validated]}
        </div>

        {variableList}

        <div className="three columns">
          <label htmlFor="newVariable">~</label>
          <div className="together">
            <input type="text" name="newVariable" className="leftInput" id="newVariable" placeholder="Add new variable" onChange={(e) => this.props.updateVariables(e)} value={this.state.newVariable} className="variable"/>
            <button className="button rightInput" id="submitVariable" onClick={(e) => this.submitVariable(e)}>></button>
          </div>
        </div>
      </div>
    )
  }
}


export default AddNewEntry_VariableRow
