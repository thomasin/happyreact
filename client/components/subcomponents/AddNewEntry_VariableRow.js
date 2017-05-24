import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable, addVariable} from '../../../scripts/api'

class AddNewEntry_VariableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {variables: [], newVariable: '', validated: 'default'}
  }

  componentDidMount() {
    this.getVariables()
  }

  displayVariables(variables) {
    return variables.map((variable) => {
      return (
        <div className="three columns" key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input type="text" className="variable" name={variable.id} id={variable.name} onChange={(e) => this.updateVariables(e)} />
        </div>
      )
    })
  }

  getVariables() {
    getAllOfTable('variable', (variables) => {
      this.setState({variables, newVariable: ''})
    })
  }

  submitVariable(e) {
    e.preventDefault()
    addVariable(this.state, () => this.getVariables())
  }


  validateValue(e) {
  var allowedWords = ['', 'yes', 'no', 'true', 'false', 'y', 'n']
    if (e.name == 'newVariable') {
      console.log('new')
      if (e.value.length > 20) {
        e.classList.add('invalid')
        this.setState({ validated: 'variableNameTooLong' })
      } else {
        e.classList.remove('invalid')
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

  updateVariables(e) {
    var inputs = document.getElementsByClassName('variable')
    Array.from(inputs).forEach((input) => {
      this.validateValue(input)
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
    var toolTipMessages = {
      wrongType: 'Variables can have number values or one of y, n, yes, no, true, false (case insensitive yay)',
      valueTooLong: "Values can't be too big! We can't cope ):",
      variableNameTooLong: "Variable name a bit long",
      default: ''
    }

    let variableList = this.displayVariables(this.state.variables)
    return (
      <div className="row variableRow section">
        <div className={`twelve columns tooltip ${document.getElementsByClassName('invalid').length ? '' : 'hidden'}`} >
          {toolTipMessages[this.state.validated]}
        </div>
        {variableList}
        <div className="three columns">
          <label htmlFor="newVariable">~</label>
          <div className="together">
            <input type="text" name="newVariable" className="leftInput" id="newVariable" placeholder="Add new variable" onChange={(e) => this.updateVariables(e)} value={this.state.newVariable} className="variable"/>
            <button className="button rightInput" onClick={(e) => this.submitVariable(e)}>></button>
          </div>
        </div>
      </div>
    )
  }
}



export default AddNewEntry_VariableRow
