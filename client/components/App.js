import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import ViewData from './ViewData'
import AddEntry from './AddEntry'

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact={true} path='/' component={Home} />
        <Route path='/view-data' component={ViewData} />
        <Route path='/add-entry' component={AddEntry} />
      </div>
    </Router>
  )
}

export default App
