import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact={true} path='/' component={Home} />
      </div>
    </Router>
  )
}

export default App
