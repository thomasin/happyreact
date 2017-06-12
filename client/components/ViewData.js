import React from 'react'
import { connect } from 'react-redux'
import barGraph from '../scripts/d3/viewData'
import {makeDataRequest} from '../scripts/api'

class ViewData extends React.Component {
  componentWillMount () {
    if (!this.props.login.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentDidMount () {
    makeDataRequest(barGraph)
  }

  render () {
    return (
      <div className='contentContainer'>
        <div className='flexWrap'>
          <div className='' id='legendRow'>
            <div className='legendRow' />
          </div>
          <div id='svgContainer'>
            <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
          </div>
        </div>
      </div>
    )
  }
}

function mapState2Props (state) {
  return {
    login: state.login
  }
}

export default connect(mapState2Props)(ViewData)
