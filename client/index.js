import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

// establishes socket connection
import './socket'
console.log('loggin here', process.env.NODE_ENV)
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
