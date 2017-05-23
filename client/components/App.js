import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import ViewData from './ViewData'

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact={true} path='/' component={Home} />
        <Route exact={true} path='/view-data' component={ViewData} />
      </div>
    </Router>
  )
}

export default App
