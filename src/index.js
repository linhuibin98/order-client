import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router } from 'react-router-dom'
import { AliveScope } from 'react-activation'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AliveScope>
        <App />
      </AliveScope>
    </Provider>
  </Router>,
  document.getElementById('root')
)
serviceWorker.unregister()
