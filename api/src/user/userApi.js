const validation = require('./validation')
const userModel  = require('./userModel')
const errorHandler = require('./errorHandler')

const _ = require('lodash')

module.exports = function(db) {

  const getUserByName = errorHandler.decorate((req, res) => {
    const name = req.params.username
    return userModel.getUserByName(db, name).then(user => {
      if (user) {
        user.type = user.type || 'client'
        return _.omit(user, ['_id', 'bookmarks','password'])
      }
      else {
        return Promise.reject({type: 'user-not-found'})
      }
    })
  })

  const listClients = errorHandler.decorate((req, res) => {
    return userModel.listClients(db, req.token)
  })

  const saveUser = errorHandler.decorate((req, res) => {
    const body = req.body
    const check = validation.checkUser(body)
    const token = req.token

    if (check.success) {
      return userModel.saveUser(db, body, token).then(result => ({success: true}))
    }
    else {
      return Promise.reject({type: 'validation-error', error: check.error})
    }
  })

  const authenticate = errorHandler.decorate((req, res) => {
    const body = req.body
    const check = validation.checkLoginRequest(body)

    if (check.success) {
      return userModel.authenticate(db, body.username, body.password)
        .then(result => ({
          authenticated: true,
          token: result.token
        }))
    }
    else {
      return Promise.reject({type: 'validation-error', error: check.error})
    }
  })

  const getBookmarks = errorHandler.decorate((req, res) => {
    const username = req.params.username
    const token = req.token

    return userModel.getUserBookmarks(db, username, token)
  })

  const saveBookmark = errorHandler.decorate((req, res) => {
    const username = req.params.username
    const bookmarkName = req.params.bookmark
    const body = req.body
    const token = req.token

    const check = validation.checkSaveBookmarkRequest(body)

    if (check.success) {
      body.name = bookmarkName
      return userModel.saveBookmark(db, username, body, token).then(() => ({success: true}))
    }
    else {
      return Promise.reject({type: 'validation-error', error: check.error})
    }
  })

  const removeBookmark = errorHandler.decorate((req, res) => {
    const username = req.params.username
    const bookmarkName = req.params.bookmark
    const token = req.token

    return userModel.removeBookmark(db, username, bookmarkName, token).then(() => ({success: true}))
  })

  const updateBookmark = errorHandler.decorate((req, res) => {
    const username = req.params.username
    const bookmarkName = req.params.bookmark
    const body = req.body
    const token = req.token

    const check = validation.checkUpdateBookmarkRequest(body)

    if (check.success) {
      body.name = bookmarkName
      return userModel.updateBookmark(db, username, body, token).then(() => ({success: true}))
    }
    else {
      return Promise.reject({type: 'validation-error', error: check.error})
    }
  })

  return {
    listClients: listClients,
    getUserByName: getUserByName,
    saveUser: saveUser,
    authenticate: authenticate,
    getBookmarks: getBookmarks,
    saveBookmark: saveBookmark,
    removeBookmark: removeBookmark,
    updateBookmark: updateBookmark
  }
}
