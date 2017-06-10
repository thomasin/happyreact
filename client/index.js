import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { getVariables } from './actions/variables'
import { checkSession } from './actions/loginAuth'
import { initialiseVariables  } from './actions/formValues'

import reducers from './reducers'
import App from './components/App'

let store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
      )
})
