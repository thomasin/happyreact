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


  componentDidMount () {
    if (!this.props.login.isAuthenticated) {
      this.props.history.push('/')
    }
    makeDataRequest((err, res) => {
      console.log({err, res})
      if (res.body) streamGraph(res.body)
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
      <div className="contentContainer">
        <div id='svgContainer'>
          <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 960 500' />
        </div>
        <div className='homeContainer'>
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
