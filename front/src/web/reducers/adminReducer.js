import _ from 'lodash'

export const initialState = {
  users: [],
  selectedUser: null,
  bookmarks: []
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'change-admin-user-list':
      return {...state, users: _.sortBy(action.value, ['username'])}
    case 'admin-select-user':
      return {...state, selectedUser: action.value}
    case 'admin-deselect-user':
      return {...state, selectedUser: null, bookmarks: []}
    case 'change-admin-bookmarks-list':
      return {...state, bookmarks: action.value}
    default:
      return state
  }
}
