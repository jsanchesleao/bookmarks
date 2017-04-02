import { createStore, combineReducers } from 'redux'

import * as login from './reducers/loginReducer'

const initialState = {
  login: login.initialState
}

const reducer = combineReducers({
  login: login.reducer
})

export default createStore(reducer)
