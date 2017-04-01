const db = require('./db')
const userApi = require('./user/userApi')(db)

function configureRoutes(app) {

  app.get('/user/:username', userApi.getUserByName)
  app.get('/user/:username/bookmark', userApi.getBookmarks)

  app.post('/user', userApi.saveUser)
  app.post('/user/:username/bookmark', userApi.addBookmark)

  app.post('/authenticate', userApi.authenticate)

}

module.exports = configureRoutes
