import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable} from '../../../scripts/api'

class AddNewEntry_VariableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {variables: []}
  }

  componentDidMount() {
    getAllOfTable('variable', (variables) => this.setState({variables}))
  }

  displayVariables(variables) {
    return variables.map((variable) => {
      return (
        <div className="three columns" key={variable.id}>
          <label htmlFor={variable.name}>{variable.name}</label>
          <input type="text" name={variable.id} id={variable.name} />
        </div>
      )
    })
  }

  render() {
    let variableList = this.displayVariables(this.state.variables)
    return (
      <div className="row variableRow section">
        {variableList}
        <div className="three columns">
          <label htmlFor="newVariable">~</label>
          <div className="together">
            <input type="text" name="newVariable" className="leftInput" id="newVariable" placeholder="Add new variable" />
            <button className="button rightInput">></button>
          </div>
        </div>
      </div>
    )
  }
}



export default AddNewEntry_VariableRow
