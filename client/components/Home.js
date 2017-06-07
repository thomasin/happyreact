import React from 'react'
import {Link} from 'react-router-dom'
import jump from 'jump.js'
import moment from 'moment'
import {connect} from 'react-redux'
import sortBy from 'sort-by'

import { attemptLogout } from '../actions/loginAuth'
import { getEntries } from '../actions/entries'
import streamGraph from '../scripts/d3/home'
import {makeDataRequest, getAllOfTable} from '../scripts/api'

class Home extends React.Component {
  constructor (props) {
    super(props)
    props.dispatch(getEntries())
  }

  componentWillMount () {
    if (!this.props.login.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  componentDidMount () {
    makeDataRequest(streamGraph)
  }

  scrollToEntries (e) {
    jump('.entries-list', {
      offset: -16
    })
  }

  displayEntries (entries) {
    return entries.map((entry) => {
      return (
        <div key={entry.id} className='row'>
          <div className='twelve columns'>
            <Link to={`/${entry.id}`} className='button u-full-width' id={`entry-${entry.id}`}>
              { entry.title ? entry.title : moment(`${entry.created_at} +0000`, 'YYYY-MM-DD kk:mm:ss ZZ').local().format('Do MMM YYYY') }
            </Link>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(attemptLogout(() => { this.props.history.push('/login') }))}>LogOut</button>
        <div className='row' id='svgContainer'>
          <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='twelve columns'>
              <h2 className='downArrow'><img src='images/arrow-down.png' width='70px' onClick={(e) => this.scrollToEntries(e)} /></h2>
            </div>
          </div>
          <div className='entries-list'>
            {this.displayEntries(this.props.entries.reverse())}
          </div>
        </div>
      </div>
    )
  }
}

Home = connect()(Home)
export default Home
