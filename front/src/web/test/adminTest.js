import * as login from '../reducers/adminReducer'
import chai from 'chai'

const expect = chai.expect

describe('admin reducer', function() {
  it('changes the displayed users list', function() {
    const state  = {users: [], bookmarks: [], selectedUser: null}
    const action = {type: 'change-admin-user-list', value: [{username: 'foo'}]}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({
      users: [{username: 'foo'}],
      selectedUser: null,
      bookmarks: []
    })
  })

  it('can select a user, displaying a box', function() {
    const state  = {users: [{username: 'foo'}], bookmarks: [], selectedUser: null}
    const action = {type: 'admin-select-user', value: {username: 'foo'}}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({
      users: [{username: 'foo'}],
      selectedUser: {username: 'foo'},
      bookmarks: []
    })
  })

  it('can deselect a user, thus unloading its bookmarks', function() {
    const state  = {
      users: [{username: 'foo'}],
      bookmarks: [{url: 'http://github.com', name: 'github'}],
      selectedUser: {username: 'foo'}
    }
    const action = {type: 'admin-deselect-user'}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({
      users: [{username: 'foo'}],
      selectedUser: null,
      bookmarks: []
    })
  })
})
