import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import LoginContainer from '../containers/LoginContainer'
import SignUpContainer from '../containers/SignUpContainer'
import HomeContainer from '../containers/HomeContainer'
import Nav from './subcomponents/Nav'
import ViewData from './ViewData'
import ViewEntry from './ViewEntry'
import AddEntryContainer from '../containers/AddEntryContainer'

const App = () => {
  return (
    <Router>
      <div className="componentContainer">
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/signup" component={SignUpContainer} />
        <Route path='/dashboard*' component={Nav} />
        <Route exact path="/dashboard/" component={HomeContainer} />
        <Route exact path='/dashboard/view-data' component={ViewData} />
        <Route exact path='/dashboard/add-entry' component={AddEntryContainer} />
        <Route exact path='/dashboard/:id' component={ViewEntry} />
      </div>
    </Router>
  )
}

export default App
