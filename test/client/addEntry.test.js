import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'

import './setup-dom'
import AddEntry from '../../client/components/AddEntry'

AddEntry.prototype.componentDidMount = () => {}

test('Add entry page has both input ranges', (t) => {
  const wrapper = mount(<AddEntry />)
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
