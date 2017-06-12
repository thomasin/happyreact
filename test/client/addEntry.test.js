import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'

import './setup-dom'
import store from '../../client/store'
import AddEntry from '../../client/components/AddEntry'

AddEntry.prototype.componentDidMount = () => {}

test('Add entry page has both input ranges', (t) => {
  const wrapper = mount(<Provider store={store}><AddEntry /></Provider>)
  wrapper.setState({
    variables: [
      {id: 1, name: 'Cats', value: ''},
      {id: 2, name: 'Dogs', value: ''},
      {id: 3, name: 'Dolphins', value: ''}
    ],
    newVariable: ''
  })
  t.is(wrapper.find('[type="range"]').length, 2)
})
