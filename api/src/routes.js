const db = require('./db')

function configureRoutes(app) {

  app.get('/status', function(req, res) {
    res.send('ok')
  })

}

module.exports = configureRoutes
