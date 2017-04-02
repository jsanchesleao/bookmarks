import React from 'react'
import NavBar from './NavBar'
import BookmarkList from './BookmarkList'

import { Modal } from 'react-bootstrap'


function selectState(state) {
  return state.admin
}

const UsersList = ({users, onSelectUser}) => (
  <div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h2>Registered Users</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        {(users.length === 0) && (
          <p>No registered users</p>
        )}
        <div className="list-group">
          {users.map(user => (
            <a href="#" className="list-group-item" onClick={onSelectUser(user)} key={user.username}>
              <h4>{user.username}</h4>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const UsersBookmarksDisplay = ({show, user, bookmarks, onClose}) => (
  <Modal show={show}>
    <Modal.Body>
      <BookmarkList
        title={user ? user.username : ''}
        smallUrl={true}
        displayActions={false}
        bookmarks={bookmarks}
      />
    </Modal.Body>
    <Modal.Footer>
      <button className="btn btn-default" onClick={onClose}>Close</button>
    </Modal.Footer>
  </Modal>
)


export default class extends React.Component {
  constructor({store, actions}) {
    super()
    this.actions = actions
    this.store = store
    this.state = selectState(store.getState())
    this.unsubscribe = store.subscribe(() => this.setState(selectState(store.getState())))

    actions.loadUsers(store)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
    this.unsubscribe = null
  }

  render () {
    return (
      <div className="container">

        <NavBar
          logout={true} />

        <UsersList
          users={this.state.users}
          onSelectUser={this.actions.selectUser(this.store)}
          />

        <UsersBookmarksDisplay
          show={this.state.selectedUser !== null}
          bookmarks={this.state.bookmarks}
          user={this.state.selectedUser}
          onClose={this.actions.deselectUser(this.store)}

        />


      </div>
    )
  }

}
