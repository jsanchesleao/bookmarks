export const initialState = {
  username: '',
  password: '',
  failure: false,
  errorMessage: ''
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'change-signup-form-username':
      return {...state, username: action.value, failure: false}
      case 'change-signup-form-password':
        return {...state, password: action.value, failure: false}
      case 'signup-failed':
        return {...state, failure: true, errorMessage: action.message}
    default:
      return state
  }
}
