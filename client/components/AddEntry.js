import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable} from '../../scripts/api'
import AddNewEntry_VariableRow from './subcomponents/AddNewEntry_VariableRow'
import {validateVariableValues, variableValuesToolTipMessages} from '../../scripts/utils/validation'

class AddEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        variables: [],
        newVariable: '',
        validated: 'default'
    }
  }

  componentDidMount() {
    this.getVariables()
  }

  getVariables() {
    getAllOfTable('variable', (variables) => {
      variables.forEach((variable) => {
        variable.value = ''
      })
      this.setState({
        variables,
        newVariable: ''
      })
    })
  }

  updateVariables(e) { // Make sure state reflects variable values
    var inputs = document.getElementsByClassName('variable')
    Array.from(inputs).forEach((input) => {
      validateVariableValues.call(this, input)
    })

    if (e.target.name == 'newVariable') {
      this.setState({ 'newVariable': e.target.value })
    } else {
      let i = this.state.variables.find((v) => {
        return v.id == e.target.name
      })
      i.value = e.target.value
      this.setState({ variables: this.state.variables})
    }
  }

  render() {
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
              <input type="range" min="1" max="5" name="energy" id="energyBar" defaultValue="3" />
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
              <input type="range" min="1" max="5" name="outlook" id="outlookBar" defaultValue="3" />
            </div>
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Positive</h5>
              </label>
            </div>
          </div>

          <AddNewEntry_VariableRow variables={this.state.variables} newVariable={this.state.newVariable} validated={this.state.validated} getVariables={this.getVariables.bind(this)} updateVariables={this.updateVariables.bind(this)}/>

          <div className="row">
            <textarea className="entryText text" name="entry"></textarea>
          </div>

          <div className="row">
            <button type="submit" className="button-primary">Create</button>
          </div>
        </form>
      </div>

    )
  }
}


export default AddEntry
