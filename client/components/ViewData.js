import React from 'react'
import {Link} from 'react-router-dom'
import {makeRequest} from '../../scripts/viewData'

class ViewData extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makeRequest()
  }

  render() {
    return (
      <div className="row" id="svgContainer">
        <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 960 500"></svg>
      </div>
    )
  }
}

export default ViewData
