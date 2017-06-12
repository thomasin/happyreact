import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'
import {Provider} from 'react-redux'

import './setup-dom'
import store from '../../client/store'
import Home from '../../client/components/Home'

Home.prototype.componentDidMount = () => {}

test('Home page loads entries', (t) => {
  const wrapper = shallow(<Provider store={store}><Home /></Provider>)
  wrapper.setState({entries: [
    {id: 1, title: 'Cats'},
    {id: 2, title: 'Dogs'}
  ]})
  t.is(wrapper.find('#entry-1').exists(), true)
})

test('Entries list links to entry', (t) => {
  const wrapper = shallow(<Provider store={store}><Home /></Provider>)
  wrapper.setState({entries: [
    {id: 1, title: 'Cats'},
    {id: 2, title: 'Dogs'}
  ]})
  t.is(wrapper.find('[to="/1"]').exists(), true)
})
