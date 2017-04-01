const validation = require('./validation')
const userModel  = require('./userModel')
const errorHandler = require('./errorHandler')

module.exports = function(db) {

  const getUserByName = errorHandler.decorate((req, res) => {
    const name = req.params.username
    return userModel.getUserByName(db, name).then(user => {
      if (user) {
        return user
      }
      else {
        return Promise.reject({type: 'user-not-found'})
      }
    })
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

  const addBookmark = errorHandler.decorate((req, res) => {
    const username = req.params.username
    const body = req.body
    const token = req.token

    const check = validation.checkBookmark(body)

    if (check.success) {
      return userModel.addBookmark(db, username, body, token).then(() => ({success: true}))
    }
    else {
      return Promise.reject({type: 'validation-error', error: check.error})
    }
  })

  function removeBookmark(req, res) {

  }

  function updateBookmark(req, res) {

  }

  return {
    getUserByName: getUserByName,
    saveUser: saveUser,
    authenticate: authenticate,
    getBookmarks: getBookmarks,
    addBookmark: addBookmark
  }
}
