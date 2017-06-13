import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import './setup-dom'
import store from '../../client/store'
import AddEntry from '../../client/components/AddEntry'

AddEntry.prototype.componentWillMount = () => {}

test('Add entry page has both input ranges', (t) => {
  const wrapper = mount(
      <MemoryRouter>
        <AddEntry
          store={store}
          invalid={[]}
          />
      </MemoryRouter>
  )
  t.is(wrapper.find('[type="range"]').length, 2)
})

test('An invalid variable value causes create button to disable', (t) => {
  const wrapper = mount(
      <MemoryRouter>
        <AddEntry
          store={store}
          invalid={['Cats']}
          />
      </MemoryRouter>
  )

  t.is(wrapper.find('.disabled').exists(), true)
})
