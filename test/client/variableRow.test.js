import test from 'ava'
import React from 'react'
import {shallow, mount} from 'enzyme'

import './setup-dom'
import AddEntry from '../../client/components/AddEntry'

AddEntry.prototype.componentDidMount = () => {}

test('Variable row loads all variables + new variable', (t) => {
  const wrapper = mount(<AddEntry />)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value:''},
      {id: 2, name: 'Dogs', value:''},
      {id: 3, name: 'Dolphins', value:''},
    ],
    newVariable: ''
  })
  t.is(wrapper.find('.variable').length, 4)
})
