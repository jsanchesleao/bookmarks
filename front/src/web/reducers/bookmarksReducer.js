import _ from 'lodash'

export const initialState = {
  bookmarks: [],
  bookmarkName: '',
  bookmarkUrl: '',
  editing: false,
  displayForm: false
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'change-user-bookmarks':
      return {...state, bookmarks: _.sortBy(action.value, ['name'])}
    case 'change-user-bookmark-name':
      return {...state, bookmarkName: action.value}
    case 'change-user-bookmark-url':
      return {...state, bookmarkUrl: action.value}
    case 'hide-edit-bookmark-form':
      return {...state, displayForm: false}
    case 'show-edit-bookmark-form':
      return {...state, displayForm: true}
    case 'select-user-bookmark':
      return {...state,
        bookmarkName: action.value.name,
        bookmarkUrl: action.value.url,
        editing: true,
        displayForm: true
      }
    case 'new-user-bookmark':
      return {...state,
        bookmarkName: '',
        bookmarkUrl: '',
        editing: false,
        displayForm: true
      }
    default:
      return state
  }
}
