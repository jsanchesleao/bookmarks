export const initialState = {
  username: 'foo',
  password: 'bar',
  failure: false
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'change-login-form-username':
      return {...state, username: action.value, failure: false}
      case 'change-login-form-password':
        return {...state, password: action.value, failure: false}
      case 'authentication-failed':
        return {...state, failure: true}
    default:
      return state
  }
}
