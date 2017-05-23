import React from 'react'
import {Link} from 'react-router-dom'
import {makeRequest} from '../../scripts/index'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makeRequest()
  }

  render() {
    let middleLink = location.hash == '#/' ? <button className="button-primary">Add entry</button> : <button>Home</button>
    return (
      <div>
        <div className="row" id="svgContainer">
          <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 960 500"></svg>
        </div>
        <div className="container">

        </div>
      </div>
    )
  }
}

export default Home
