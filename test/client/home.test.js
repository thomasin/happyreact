import test from 'ava'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import './setup-dom'
import Home from '../../client/components/Home'

Home.prototype.componentDidMount = () => {}

test('Home page loads entries', (t) => {
  const wrapper = shallow(<Home />)
  wrapper.setState({entries: [
    {id: 1, title: 'Cats'},
    {id: 2, title: 'Dogs'}
  ]})
  t.is(wrapper.find('#entry-1').exists(), true)
})

test('Entries list links to entry', (t) => {
  const wrapper = shallow(<Home />)
  wrapper.setState({entries: [
    {id: 1, title: 'Cats'},
    {id: 2, title: 'Dogs'}
  ]})
  t.is(wrapper.find('[to="/1"]').exists(), true)
})
