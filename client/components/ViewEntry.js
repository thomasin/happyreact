import React from 'react'
import {Link} from 'react-router-dom'
import moodDot from '../scripts/d3/viewEntry'

class ViewEntry extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.match.params.id)
  }

  render() {
    return (
      <div className="container">

      </div>
    )
  }
}

export default ViewEntry
