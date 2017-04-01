const cryptography = require('./cryptography')
const tokenModel   = require('./tokenModel')

const USER_COLLECTION = 'user'

function getUserByName(db, username) {
  return db.collection(USER_COLLECTION).then(coll => {
    return coll.findOne({username: username})
  })
}

function listClients(db, token) {
  return tokenModel.validateTokenRole(db, token, 'admin')
    .then(() => db.collection(USER_COLLECTION))
    .then(coll => db.find(coll, {}, {username: 1, _id: 0}))
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

function checkBookmarkName(db, username, bookmark, token) {
  return db.collection(USER_COLLECTION)
    .then(coll => coll.findOne({username: username}))
    .then(user => {
      if (!user) {
        return Promise.reject({type: 'user-not-found'})
      }
      const bookmarks =  user.bookmarks || []
      const sameName = bookmarks.filter(b => b.name === bookmark.name)

      if (sameName.length > 0) {
        return removeBookmark(db, username, bookmark.name, token)
      }
      else {
        return 'name-ok'
      }
    })
}

function saveBookmark(db, username, bookmark, token) {
  return tokenModel.validateTokenUsername(db, token, username)
    .then(() => checkBookmarkName(db, username, bookmark, token))
    .then(() => db.collection(USER_COLLECTION))
    .then(coll => {
      return coll.update({username: username}, {$push: {bookmarks: bookmark}})
    })
}

function removeBookmark(db, username, bookmarkName, token) {
  return tokenModel.validateTokenUsername(db, token, username)
    .then(() => db.collection(USER_COLLECTION))
    .then(coll => {
      return coll.update({username: username}, {$pull: {bookmarks: {name: bookmarkName}}})
    })
}

function updateBookmark(db, username, bookmark, token) {
  return tokenModel.validateTokenUsername(db, token, username)
    .then(() => getUserBookmarks(db, username, token))
    .then(bookmarks => bookmarks.filter(b => b.name = bookmark.name)[0])
    .then(storedBookmark => {
      if (!storedBookmark) {
        return Promise.reject({type: 'bookmark-not-found'})
      }
      else {
        storedBookmark.url = bookmark.url
        return saveBookmark(db, username, storedBookmark, token)
      }
    })
}

module.exports = {
  listClients: listClients,
  getUserByName: getUserByName,
  saveUser: saveUser,
  authenticate: authenticate,
  getUserBookmarks: getUserBookmarks,
  saveBookmark: saveBookmark,
  removeBookmark: removeBookmark,
  updateBookmark: updateBookmark
}
