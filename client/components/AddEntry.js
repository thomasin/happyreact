import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable, submitEntry} from '../scripts/api'
import AddNewEntry_VariableRow from './subcomponents/AddNewEntry_VariableRow'
import AddNewEntry_InputRangeBar from './subcomponents/AddNewEntry_InputRangeBar'
import {validateVariableValues, variableValuesToolTipMessages} from '../scripts/utils/validation'

class AddEntry extends React.Component {

  constructor(props) {
    super(props)
    this.freshState = {
        variables: [],
        newVariable: {
          name: 'newVariable',
          value: '',
          disabled: false
        },
        validated: 'default',
        invalid: [],
        entry: '',
        energy: '3',
        outlook: '3'
    }
    this.state = this.freshState
  }

  componentDidMount() {
    this.getVariables()
  }

  getVariables() {
    getAllOfTable('variable', (variables) => {
      variables.forEach((variable) => {
        let i = this.state.variables.findIndex((v) => { // Check if variable already exists
          return v.id == variable.id
        })
        variable.value = i != -1 ? this.state.variables[i].value : '' // Assign old values
        variable.disabled = i != -1 ? this.state.variables[i].disabled : false
      })
      this.setState({
        variables,
        newVariable: {
          name: 'newVariable',
          value: '',
          disabled: false
        }
      })
    })
  }

  updateForm(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault()
    if (!this.state.invalid.length) {
      submitEntry(this.state, (err) => this.submitFeedback(err))
    }
  }

  refresh() {
    this.setState(this.freshState)
    this.getVariables()
  }

  submitFeedback(err) {
    if (!err) {
      console.log('success!')
      this.refresh()
    } else {
      console.log(err)
    }
  }

  updateVariables(e) {
    if (e.target.name == 'newVariable') {
      this.state.newVariable.value = e.target.value
      this.setState({ newVariable: this.state.newVariable })
    } else {
      let i = this.state.variables.find((v) => {
        return v.id == e.target.name
      })
      i.value = e.target.value
      this.setState({ variables: this.state.variables})
    }
    this.validateEach()
  }

  validateEach() {
    var inputs = [...this.state.variables, this.state.newVariable]
    Array.from(inputs).forEach((input) => {
      validateVariableValues.call(this, input)
    })
  }

  render() {
    return (
      <div className="container">
        <form method="post">

          <AddNewEntry_InputRangeBar
            title="energy"
            leftInput="Low Energy"
            rightInput="High Energy"
            value={this.state.energy}
            updateForm={this.updateForm.bind(this)}/>

          <AddNewEntry_InputRangeBar
            title="outlook"
            leftInput="Negative"
            rightInput="Positive"
            value={this.state.outlook}
            updateForm={this.updateForm.bind(this)}/>

          <AddNewEntry_VariableRow
            variables={this.state.variables}
            newVariable={this.state.newVariable}
            validated={this.state.validated}
            invalid={this.state.invalid}
            getVariables={this.getVariables.bind(this)}
            updateVariables={this.updateVariables.bind(this)}/>

          <div className="row">
            <textarea className="entryText text" name="entry" onChange={(e) => this.updateForm(e)} value={this.state.entry}>{this.state.entry}</textarea>
          </div>

          <div className="row">
            <button
              type="submit" className={`button-primary ${this.state.invalid.length ? 'disabled' : ''}`} id="createButton" onClick={(e) => this.submitForm(e)}>Create</button>
          </div>
        </form>
      </div>

    )
  }
}


export default AddEntry
