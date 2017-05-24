import test from 'ava'
import React from 'react'
import {shallow, mount} from 'enzyme'

import './setup-dom'
import Home from '../../client/components/Home'

Home.prototype.componentDidMount = () => {}

test('Home page loads entries', (t) => {
  const wrapper = mount(<Home />)
  wrapper.setState({entries: [
    {id: 1, title: 'Cats'},
    {id: 2, title: 'Dogs'}
  ]})
  t.is(wrapper.find('#entry-1').exists(), true)
})
