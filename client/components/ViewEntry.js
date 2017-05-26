import React from 'react'
import {Link} from 'react-router-dom'
import barGraph from '../scripts/d3/viewData'
import {makeDataRequest} from '../scripts/api'

class ViewData extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makeDataRequest(barGraph)
  }

  render() {
    return (
      <div className="flexWrap">
      <div className="container" id="legendRow">
        <div className="row legendRow"></div>
      </div>
      <div className="row" id="svgContainer">
        <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 960 500"></svg>
      </div>
      </div>
    )
  }
}

export default ViewData
