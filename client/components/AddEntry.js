import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable} from '../../scripts/api'

class AddEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getAllOfTable('variable', console.log)
  }

  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}

export default AddEntry
