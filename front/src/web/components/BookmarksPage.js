import React from 'react'
import NavBar from './NavBar'
import BookmarkList from './BookmarkList'

import { Modal } from 'react-bootstrap'

function selectState(state) {
  return state.bookmarks
}


const BookmarkForm = ({show, onClose, onSubmit, name, url, onChangeName, onChangeUrl, editing}) => (
  <Modal show={show}>
    <Modal.Body>
      <h2>{editing ? 'Edit Bookmark' : 'Add Bookmark'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="inputBookmarkName">Name</label>
          {editing
            ? (<h4>{name}</h4>)
            : (<input type="text" className="form-control" id="inputBookmarkName" value={name} onChange={onChangeName} />)
          }
        </div>
        <div className="form-group">
          <label htmlFor="inputBookmarkUrl">Url</label>
          <input type="text" className="form-control" id="inputBookmarkUrl" value={url} onChange={onChangeUrl} />
        </div>
        {editing
          ? (<div className="row">
              <div className="col-md-3 col-xs-6">
                <button type="submit" className="btn btn-primary btn-block">Update</button>
              </div>
              <div className="col-md-3 col-md-offset-6 col-xs-6">
                <button type="button" className="btn btn-danger btn-block">Delete</button>
              </div>
            </div>)
          : (<button type="submit" className="btn btn-primary">Save</button>)}

      </form>
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

    actions.loadBookmarks(store)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
    this.unsubscribe = null
  }

  render () {
    return (
      <div className="container">

        <NavBar logout={true}/>
        <BookmarkList
          displayActions={true}
          title="My Bookmarks"
          bookmarks={this.state.bookmarks}
          onAddBookmark={this.actions.addBookmark(this.store)}
          onEdit={this.actions.onClickEditBookmark(this.store)}
          onRemove={this.actions.onClickRemoveBookmark(this.store)}
          />

        <BookmarkForm
          onClose={this.actions.hideForm(this.store)}
          show={this.state.displayForm}
          editing={this.state.editing}
          name={this.state.bookmarkName}
          url={this.state.bookmarkUrl}
          onChangeName={this.actions.changeBookmarkName(this.store)}
          onChangeUrl={this.actions.changeBookmarkUrl(this.store)}
          onSubmit={this.actions.submitForm(this.store)}
        />


      </div>
    )
  }

}
