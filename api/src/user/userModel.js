const cryptography = require('./cryptography')
const tokenModel   = require('./tokenModel')
const _ = require('lodash')

const USER_COLLECTION = 'user'

function getUserByName(db, username) {
  return db.collection(USER_COLLECTION).then(coll => {
    return coll.findOne({username: username})
  })
  .then(user => _.omit(user, ['_id', 'bookmarks']))
}

function saveUser(db, user, token) {
  if (!user.type) {
    user.type = 'client'
  }
  user.bookmarks = []
  return getUserByName(db, user.username).then(user => {
    if (user) {
      return Promise.reject({type: 'username-taken'})
    }
    else {
      return 'username-ok'
    }
  })
  .then(() => {
    if (user.type === 'admin') {
      return tokenModel.validateTokenRole(db, token, 'admin')
    }
    else {
      return 'role-ok'
    }
  })
  .then(() => db.collection(USER_COLLECTION))
  .then(coll => {
    return cryptography.encryptPassword(user.password).then(password => {
      user.password = password
      return coll.insertOne(user)
    })
  })
}

function authenticate(db, username, password) {
  return getUserByName(db, username).then(user => {
    if (!user) {
      return Promise.reject({type: 'user-not-found'})
    }
    else {
      return cryptography.comparePassword(password, user.password).then(() => tokenModel.saveToken(db, user))
    }
  })
}

function getUserBookmarks(db, username, token) {
  return tokenModel.validateTokenClient(db, token, username)
    .then(() => db.collection(USER_COLLECTION))
    .then(coll => {
      return coll.findOne({username: username})
    })
    .then(user => {
      if (!user) {
        return Promise.reject({type: 'user-not-found'})
      }
      else {
        return user.bookmarks || []
      }
    })
}

function checkBookmarkName(db, username, bookmark) {
  return db.collection(USER_COLLECTION)
    .then(coll => coll.findOne({username: username}))
    .then(user => {
      if (!user) {
        return Promise.reject({type: 'user-not-found'})
      }
      const bookmarks =  user.bookmarks || []
      const sameName = bookmarks.filter(b => b.name === bookmark.name)

      if (sameName.length > 0) {
        return Promise.reject({type: 'bookmark-name-exists'})
      }
      else {
        return 'name-ok'
      }
    })
}

function addBookmark(db, username, bookmark, token) {
  return tokenModel.validateTokenUsername(db, token, username)
    .then(() => checkBookmarkName(db, username, bookmark))
    .then(() => db.collection(USER_COLLECTION))
    .then(coll => {
      return coll.update({username: username}, {$push: {bookmarks: bookmark}})
    })
}

module.exports = {
  getUserByName: getUserByName,
  saveUser: saveUser,
  authenticate: authenticate,
  getUserBookmarks: getUserBookmarks,
  addBookmark: addBookmark
}
