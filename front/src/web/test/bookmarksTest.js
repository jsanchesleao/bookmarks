import * as login from '../reducers/bookmarksReducer'
import chai from 'chai'

const expect = chai.expect

describe('bookmarks reducer', function() {
  it('changes the displayed bookmarks with an action', function() {
    const state  = {bookmarks: []}
    const action = {type: 'change-user-bookmarks', value: [{url: 'http://google.com', name: 'google'}]}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({bookmarks: [{url: 'http://google.com', name: 'google'}]})
  })

  it('hides and displays the editing box', function() {
    const state  = {bookmarks: [], displayForm: false}
    const next  = login.reducer(state, {type: 'show-edit-bookmark-form'})

    expect(next).to.deep.equal({bookmarks: [], displayForm: true})
    const next2 = login.reducer(next, {type: 'hide-edit-bookmark-form'})
    expect(next2).to.deep.equal({bookmarks: [], displayForm: false})

  })

  it('enters the edit mode when some bookmark is selected', function() {
    const state  = {
      bookmarks: [{url: 'http://google.com', name: 'google'}],
      editing: false,
      bookmarkName: '',
      bookmarkUrl: '',
      displayForm: false
    }
    const next  = login.reducer(state, {type: 'select-user-bookmark', value: {url: 'http://google.com', name: 'google'}})

    expect(next).to.deep.equal({
      bookmarks: [{url: 'http://google.com', name: 'google'}],
      editing: true,
      bookmarkName: 'google',
      bookmarkUrl: 'http://google.com',
      displayForm: true
    })
  })

  it('clears up the form when a new bookmark will be created', function() {
    const state  = {
      bookmarks: [{url: 'http://google.com', name: 'google'}],
      editing: true,
      bookmarkName: 'foo',
      bookmarkUrl: 'bar',
      displayForm: false
    }
    const next  = login.reducer(state, {type: 'new-user-bookmark'})

    expect(next).to.deep.equal({
      bookmarks: [{url: 'http://google.com', name: 'google'}],
      editing: false,
      bookmarkName: '',
      bookmarkUrl: '',
      displayForm: true
    })
  })
})
