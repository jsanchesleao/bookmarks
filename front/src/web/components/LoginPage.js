import React from 'react'

const NavBar = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Bookmarks</a>
      </div>
    </div>
  </nav>
)

const submitLoginForm = onSubmit => e => {
  e.preventDefault()
  onSubmit()
  return false
}

const LoginForm = ({displayError, username, password, onChangeUsername, onChangePassword, onSubmit}) => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3 col-xs-12">
      <form onSubmit={submitLoginForm(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input type="text" className="form-control" id="inputUsername" value={username} onChange={onChangeUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={password} onChange={onChangePassword} />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        {displayError && (
          <div className="alert alert-danger">Login failed.</div>
        )}
      </form>
      <a href="/signup">I don't have an account.</a>
    </div>
  </div>
)

function selectState(state) {
  return state.login
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
        <LoginForm
          displayError={this.state.failure}
          username={this.state.username}
          password={this.state.password}
          onChangeUsername={this.actions.changeUsername(this.store)}
          onChangePassword={this.actions.changePassword(this.store)}
          onSubmit={this.actions.performLogin(this.store)} />


      </div>
    )
  }

}
