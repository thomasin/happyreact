import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable, submitEntry} from '../scripts/api'
import AddNewEntry_VariableRow from './subcomponents/AddNewEntry_VariableRow'
import {validateVariableValues, variableValuesToolTipMessages} from '../scripts/utils/validation'

class AddEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  componentDidMount() {
    this.getVariables()
  }

  getVariables() {
    getAllOfTable('variable', (variables) => {
      variables.forEach((variable) => {
        variable.value = '',
        variable.disabled = false
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
    if (!invalid.length) {
      submitEntry(this.state, (err) => this.submitFeedback(err))
    }
  }

  refresh() {
    this.setState({
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
    })
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
    var inputs = [...this.state.variables]
    inputs.push(this.state.newVariable)
    Array.from(inputs).forEach((input) => {
      console.log(input)
      validateVariableValues.call(this, input)
    })
  }

  render() {
    let createButton =  this.state.invalid.length ? 'button-primary disabled' : 'button-primary'
    return (
      <div className="container">
        <form method="post">

          <div className="row range">
            <div className="three columns">
              <label htmlFor="energyBar">
                <h5 className="title inline h7">Low Energy</h5>
              </label>
            </div>
            <div className="six columns">
              <input type="range" min="1" max="5" name="energy" id="energyBar" value={this.state.energy} onChange={(e) => this.updateForm(e)}/>
            </div>
            <div className="three columns">
              <label htmlFor="energyBar">
                <h5 className="title inline h7">High Energy</h5>
              </label>
            </div>
          </div>

          <div className="row range section">
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Negative</h5>
              </label>
            </div>
            <div className="six columns">
              <input type="range" min="1" max="5" name="outlook" id="outlookBar" value={this.state.outlook} onChange={(e) => this.updateForm(e)}/>
            </div>
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Positive</h5>
              </label>
            </div>
          </div>

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
            <button type="submit" className={createButton} id="createButton" onClick={(e) => this.submitForm(e)}>Create</button>
          </div>
        </form>
      </div>

    )
  }
}


export default AddEntry
