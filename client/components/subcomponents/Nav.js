import React from 'react'
import {Link} from 'react-router-dom'

const Nav = props => {
  let middleLink = location.hash == '#/' ? <Link to="/add-entry" className="button button-primary">Add entry</Link> : <Link to="/" className="button">Entry List</Link>
  return (
    <div className="container">
      <div className="row nav section">
        <div className="four columns">
          <Link to='/view-data' className="button">Look at data</Link>
        </div>
        <div className="four columns">
          {middleLink}
        </div>
        <div className="four columns">
          <button>Filter</button>
        </div>
      </div>
    </div>

  )
}

export default Nav