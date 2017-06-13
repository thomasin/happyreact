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
    <Provider store={store}>
      <MemoryRouter>
        <VariableRow
          invalid={[]}
          variableValues={
            [
              {id: 1, value: 'Test', disabled: false}
            ]
          }/>
      </MemoryRouter>
    </Provider>)

  t.is(wrapper.find('.variable').length, 2)
})

test('An disabled variable value causes variable to have invalid class', (t) => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <VariableRow
          invalid={[]}
          variableValues={
            [
              {id: 1, name: 'Cats', value: 'd', disabled: true},
              {id: 2, name: 'Dogs', value: ''},
              {id: 3, name: 'Dolphins', value: ''}
            ]
          }/>
      </MemoryRouter>
    </Provider>
  )

  t.is(wrapper.find('.invalid').exists(), true)
})
