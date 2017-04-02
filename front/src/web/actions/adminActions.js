import xhr from 'xhr'

export const loadUsers = store => {
  xhr({
    url: '/load_users',
    method: 'GET'
  }, function(err, resp, body) {
    console.log(body)
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'change-admin-user-list', value: JSON.parse(body)})
    }
  })
}

export const deselectUser = store => e => {
  e.preventDefault()
  store.dispatch({type: 'admin-deselect-user'})
}

export const selectUser = store => user => e => {
  e.preventDefault()
  xhr({
    url: '/load_admin_bookmarks/' + user.username,
    method: 'GET'
  }, function(err, resp, body) {
    console.log(body)
    if (err) {
      console.error(err)
    }
    else {
      store.dispatch({type: 'admin-select-user', value: user})
      store.dispatch({type: 'change-admin-bookmarks-list', value: JSON.parse(body)})
    }
  })
}
