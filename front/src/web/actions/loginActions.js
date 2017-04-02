import xhr from 'xhr'

export const changeUsername = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-login-form-username', value: e.target.value})
}

export const changePassword = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-login-form-password', value: e.target.value})
}

const redirectByRole = function(role) {
  console.log('redirect by role', role)
  if (role === 'admin') {
    window.location = '/admin'
  }
  else {
    window.location = '/bookmarks'
  }
}

export const performLogin = store => () => {
  const {username, password} = store.getState().login
  xhr({
    uri: "/login",
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
        "Content-Type": "application/json"
    }
}, function (err, resp, body) {
    if (err) {
      console.error(err);
    }
    else {
      const json = JSON.parse(body)
      if (json.success) {
        redirectByRole(json.role)
      }
      else {
        store.dispatch({type: 'authentication-failed'})
      }
    }
})
}
