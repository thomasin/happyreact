import React from 'react'
import {Link} from 'react-router-dom'

const Nav = props => {
  let middleLink = location.hash == '#/' ? <button className="button-primary">Add entry</button> : <button>jhabej</button>
  return (
    <div className="container">
      <div className="row nav section">
        <div className="four columns">
          <button>Look at data</button>
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
