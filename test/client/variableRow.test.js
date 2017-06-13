import test from 'ava'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import VariableRow from '../../client/components/subcomponents/AddNewEntry_VariableRow'

import './setup-dom'
import store from '../../client/store'


test('Variable row loads all variables + new variable', (t) => {
  const wrapper = mount(
      <MemoryRouter>
        <VariableRow
          store={store}
          invalid={[]}
          variableValues={
            [
              {id: 1, value: 'Test', disabled: false}
            ]
          }/>
      </MemoryRouter>
    )

  t.is(wrapper.find('.variable').length, 2)
})

test('An disabled variable value causes variable to have invalid class', (t) => {
  const wrapper = mount(
      <MemoryRouter>
        <VariableRow
          store={store}
          invalid={[]}
          variableValues={
            [
              {id: 1, name: 'Cats', value: 'd', disabled: true},
              {id: 2, name: 'Dogs', value: ''},
              {id: 3, name: 'Dolphins', value: ''}
            ]
          }/>
      </MemoryRouter>
  )

  t.is(wrapper.find('.invalid').exists(), true)
})
