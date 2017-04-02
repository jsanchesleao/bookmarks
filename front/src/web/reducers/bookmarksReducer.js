export const initialState = {
  bookmarks: [],
  bookmarkName: '',
  bookmarkUrl: '',
  editing: false,
  displayForm: false
}

function sortByName(bookmarks) {
  return bookmarks.sort(function(a, b) {
    if (a.name < b.name) {
      return -1
    }
    else if (a.name > b.name) {
      return 1
    }
    else {
      return 0
    }
  })
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'change-user-bookmarks':
      return {...state, bookmarks: sortByName(action.value)}
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
