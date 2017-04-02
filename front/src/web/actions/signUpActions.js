import xhr from 'xhr'

export const changeUsername = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-signup-form-username', value: e.target.value})
}

export const changePassword = store => e => {
  e.preventDefault()
  store.dispatch({type: 'change-signup-form-password', value: e.target.value})
}

export const performSignUp = store => () => {
  const {username, password} = store.getState().signUp
  xhr({
    uri: "/signup",
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
        window.location = '/'
      }
      else {
        store.dispatch({type: 'signup-failed', message: json.type})
      }
    }
})
}
