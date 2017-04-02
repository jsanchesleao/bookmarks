import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import AdminPage from './components/AdminPage'
import BookmarksPage from './components/BookmarksPage'

import * as loginActions from './actions/loginActions'
import * as signUpActions from './actions/signUpActions'
import * as adminActions from './actions/adminActions'
import * as bookmarksActions from './actions/bookmarksActions'

function renderPage(Component, actions, containerId) {
  const container = document.getElementById(containerId)
  if (container) {
    ReactDOM.render(<Component store={store} actions={actions} />, container)
  }
}

renderPage(LoginPage, loginActions, 'container-login')
renderPage(SignUpPage, signUpActions, 'container-signup')
renderPage(AdminPage, adminActions, 'container-admin')
renderPage(BookmarksPage, bookmarksActions, 'container-bookmarks')
