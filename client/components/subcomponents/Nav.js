import React from 'react'
import {Link} from 'react-router-dom'

const Nav = props => {
  let middleLink = location.hash == '#/add-entry' ? <Link to="/" className="button">Entry List</Link> : <Link to="/add-entry" className="button button-primary">Add entry</Link>
let leftLink = location.hash == '#/view-data' ? <Link to="/" className="button">Entry List</Link> : location.hash == '#/' ? <Link to="/view-data" className="button">Look at data</Link> : <Link to="/view-data" className="button">Look at data</Link>
  return (
    <div className="container">
      <div className="row nav section">
        <div className="four columns">
          {leftLink}
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
