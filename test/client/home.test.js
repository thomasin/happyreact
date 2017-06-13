import test from 'ava'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'

import './setup-dom'
import store from '../../client/store'
import { Home } from '../../client/components/Home'

Home.prototype.componentDidMount = () => {}
Home.prototype.componentWillMount = () => {}

test('Home page loads entries', (t) => {
  const wrapper = mount(<Provider store={store}><MemoryRouter><Home login={{isAuthenticated: true}} entries={[
    { id: 1, title: 'Cats'},
    { id: 2, title: 'Cats'}
  ]} dispatch={ function() {} }/></MemoryRouter></Provider>)

  t.is(wrapper.find('#entry-1').exists(), true)
})

test('Entries list links to entry', (t) => {
const wrapper = mount(<Provider store={store}><MemoryRouter><Home login={{isAuthenticated: true}} entries={[
  { id: 1, title: 'Cats'},
  { id: 2, title: 'Cats'}
]} dispatch={ function() {} }/></MemoryRouter></Provider>)

  t.is(wrapper.find('[href="/1"]').exists(), true)
})
