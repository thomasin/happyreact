import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'

import './setup-dom'
import AddEntry from '../../client/components/AddEntry'

AddEntry.prototype.componentDidMount = () => {}

test('Variable row loads all variables + new variable', (t) => {
  const wrapper = mount(<AddEntry />)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value: ''},
      {id: 2, name: 'Dogs', value: ''},
      {id: 3, name: 'Dolphins', value: ''}
    ],
    newVariable: ''
  })
  t.is(wrapper.find('.variable').length, 4)
})

test('Variable row loads names of variables', (t) => {
  const wrapper = mount(<AddEntry />)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value: ''},
      {id: 2, name: 'Dogs', value: ''},
      {id: 3, name: 'Dolphins', value: ''}
    ],
    newVariable: ''
  })
  t.is(wrapper.find('[htmlFor="Cats"]').first().text(), 'Cats')
})

test('An invalid variable value causes a response', (t) => {
  const wrapper = mount(<AddEntry />)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value: 'd', disabled: true},
      {id: 2, name: 'Dogs', value: ''},
      {id: 3, name: 'Dolphins', value: ''}
    ],
    newVariable: ''
  })
  t.is(wrapper.find('.invalid').exists(), true)
})

test('An invalid variable value causes create button to disable', (t) => {
  const wrapper = mount(<AddEntry />)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value: 'd', disabled: true},
      {id: 2, name: 'Dogs', value: ''},
      {id: 3, name: 'Dolphins', value: ''}
    ],
    newVariable: '',
    invalid: ['Cats']
  })
  t.is(wrapper.find('.disabled').exists(), true)
})
