import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Nav from './subcomponents/Nav'
import ViewData from './ViewData'
import ViewEntry from './ViewEntry'
import AddEntry from './AddEntry'

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact={true} path='/' component={Home} />
        <Route exact={true} path='/view-data' component={ViewData} />
        <Route exact={true} path='/add-entry' component={AddEntry} />
        <Route exact={true} path='/:id' component={ViewEntry} />
      </div>
    </Router>
  )
}

export default App
