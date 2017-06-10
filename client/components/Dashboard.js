import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import Nav from './subcomponents/Nav'
import ViewData from './ViewData'
import ViewEntry from './ViewEntry'
import AddEntryContainer from '../containers/AddEntryContainer'

const Dashboard = () => {
  return (
    <Router>
      <div>
        <Route path='*' component={Nav} />
        <Route exact path="/dashboard/" component={HomeContainer} />
        <Route exact path='/dashboard/view-data' component={ViewData} />
        <Route exact path='/dashboard/add-entry' component={AddEntryContainer} />
        <Route exact path='/dashboard/:id' component={ViewEntry} />
      </div>
    </Router>
  )
}

export default Dashboard
