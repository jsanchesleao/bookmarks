import React from 'react'
import NavBar from './NavBar'

const submitSignUpForm = onSubmit => e => {
  e.preventDefault()
  onSubmit()
  return false
}

const SignUpForm = ({displayError, username, password, onChangeUsername, onChangePassword, onSubmit}) => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3 col-xs-12">
      <h1>Sign Up</h1>
      <form onSubmit={submitSignUpForm(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input type="text" className="form-control" id="inputUsername" value={username} onChange={onChangeUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={password} onChange={onChangePassword} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        {displayError && (
          <div className="alert alert-danger">Registration failed.</div>
        )}
      </form>
      <a href="/login">I already have an account.</a>
    </div>
  </div>
)

function selectState(state) {
  return state.signUp
}

export default class extends React.Component {
  constructor({store, actions}) {
    super()
    this.actions = actions
    this.store = store
    this.state = selectState(store.getState())
    this.unsubscribe = store.subscribe(() => this.setState(selectState(store.getState())))
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
    this.unsubscribe = null
  }

  render () {
    return (
      <div className="container">

        <NavBar />
        <SignUpForm
          displayError={this.state.failure}
          username={this.state.username}
          password={this.state.password}
          onChangeUsername={this.actions.changeUsername(this.store)}
          onChangePassword={this.actions.changePassword(this.store)}
          onSubmit={this.actions.performSignUp(this.store)}
         />


      </div>
    )
  }

}
