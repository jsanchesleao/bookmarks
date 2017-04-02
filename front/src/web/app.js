import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'

import LoginPage from './components/LoginPage'
import * as loginActions from './actions/loginActions'

const container = document.getElementById('container')

ReactDOM.render(<LoginPage store={store} actions={loginActions} />, container)
