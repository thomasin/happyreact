import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import Nav from './subcomponents/Nav'
import ViewData from './ViewData'
import LoginContainer from '../containers/LoginContainer'
import ViewEntry from './ViewEntry'
import AddEntryContainer from '../containers/AddEntryContainer'

const App = () => {
  return (
    <Router>
      <div>
        <Route path="*" component={Nav} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path='/' component={HomeContainer} />
        <Route exact path='/view-data' component={ViewData} />
        <Route exact path='/add-entry' component={AddEntryContainer} />
        <Route exact path='/:id' component={ViewEntry} />
      </div>
    </Router>
  )
}

export default App
