import React from 'react'
import { connect } from 'react-redux'
import { attemptLogout } from '../../actions/loginAuth'
import {Link} from 'react-router-dom'

const Nav = props => {
  return (
    <div className='navContainer'>
      <div className='navFixed'>
        <div className='navRow title'>
          <Link to='/dashboard/add-entry'>Add</Link>
        </div>
        <div className='navRow title'>
          <Link to='/dashboard/'>
              Previous Entries
            </Link>
        </div>
        <div className='navRow title'>
          <Link to='/dashboard/view-data'>
              Look at data
            </Link>
        </div>

        <div className='title navRow logoutButton'>
          <a href='#' onClick={() => props.dispatch(attemptLogout(() => { props.history.push('/') }))}>Logout</a>
        </div>
      </div>
    </div>

  )
}

export default connect()(Nav)
