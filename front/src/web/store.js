import { createStore, combineReducers } from 'redux'

import * as login from './reducers/loginReducer'
import * as signUp from './reducers/signUpReducer'
import * as admin from './reducers/adminReducer'
import * as bookmarks from './reducers/bookmarksReducer'

const initialState = {
  login: login.initialState,
  signUp: signUp.initialState,
  admin: admin.initialState,
  bookmarks: bookmarks.initialState
}

const reducer = combineReducers({
  login: login.reducer,
  signUp: signUp.reducer,
  admin: admin.reducer,
  bookmarks: bookmarks.reducer
})

export default createStore(reducer)
