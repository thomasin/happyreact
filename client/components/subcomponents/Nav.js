import React from 'react'
// import d3 from 'd3'
import {Link} from 'react-router-dom'

const Nav = props => {
  let randomColour = d3.interpolateCool(Math.random())
  let middleLinkStyle = {
    backgroundColor: randomColour,
    borderColor: randomColour
  }
  let middleLink = props.location.pathname === '/add-entry' ? <Link to='/' className='button'>Entry List</Link> : <Link to='/add-entry' className='button button-primary' style={middleLinkStyle}>Add entry</Link>
let leftLink = props.location.pathname === '/view-data' ? <Link to='/' className='button'>Entry List</Link> : props.location.hash === '#/' ? <Link to='/view-data' className='button'>Look at data</Link> : <Link to='/view-data' className='button'>Look at data</Link>
  return (
    <div className='container'>
      <div className='row nav section'>
        <div className='four columns'>
          {leftLink}
        </div>
        <div className='four columns'>
          {middleLink}
        </div>
        <div className='four columns'>
          <button>Filter</button>
        </div>
      </div>
    </div>

  )
}

export default Nav
