import xhr from 'xhr'

export const addBookmark = store => e => {
  e.preventDefault()
  store.dispatch({type: 'new-user-bookmark'})
}

export const hideForm = store => e => {
  e.preventDefault()
  store.dispatch({type: 'hide-edit-bookmark-form'})
}

export const changeBookmarkName = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-user-bookmark-name', value: e.target.value})
}

export const changeBookmarkUrl = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-user-bookmark-url', value: e.target.value})
}

export const submitForm = store => e => {
  e.preventDefault()
  const state = store.getState().bookmarks

  if (state.editing) {
    editBookmark(store, state.bookmarkName, state.bookmarkUrl)
  }
  else {
    saveBookmark(store, state.bookmarkName, state.bookmarkUrl)
  }
  return false
}

function saveBookmark(store, name, url) {
  xhr({
    uri: "/save_bookmark",
    body: JSON.stringify({name, url}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }, function (err, resp, body) {
    store.dispatch({type: 'hide-edit-bookmark-form'})
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'change-user-bookmarks', value: JSON.parse(body)})
    }
  })
}

function editBookmark(store, name, url) {
  xhr({
    uri: "/edit_bookmark",
    body: JSON.stringify({name, url}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }, function (err, resp, body) {
    store.dispatch({type: 'hide-edit-bookmark-form'})
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'change-user-bookmarks', value: JSON.parse(body)})
    }
  })
}

export const onClickEditBookmark = store => bookmark => e => {
  e.preventDefault()
  store.dispatch({type: 'select-user-bookmark', value: bookmark})
}

export const onClickRemoveBookmark = store => bookmark => e => {
  e.preventDefault()
  xhr({
    uri: "/remove_bookmark",
    body: JSON.stringify(bookmark),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }, function (err, resp, body) {
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'change-user-bookmarks', value: JSON.parse(body)})
    }
  })
}

export const loadBookmarks = store => {
  xhr({
    uri: "/load_bookmarks",
    method: 'GET'
  }, function (err, resp, body) {
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'change-user-bookmarks', value: JSON.parse(body)})
    }
  })
}
