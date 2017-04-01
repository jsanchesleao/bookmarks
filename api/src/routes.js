const db = require('./db')
const userApi = require('./user/userApi')(db)

function configureRoutes(app) {

  app.get('/user', userApi.listClients)
  app.get('/user/:username', userApi.getUserByName)
  app.get('/user/:username/bookmark', userApi.getBookmarks)

  app.post('/user', userApi.saveUser)

  app.put('/user/:username/bookmark/:bookmark', userApi.saveBookmark)
  app.post('/user/:username/bookmark/:bookmark', userApi.updateBookmark)

  app.delete('/user/:username/bookmark/:bookmark', userApi.removeBookmark)

  app.post('/authenticate', userApi.authenticate)

}

module.exports = configureRoutes
