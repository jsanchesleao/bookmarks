const express = require('express')
const routes  = require('./routes')

const config  = require('../config.json')

const app = express()

routes(app)

app.listen(config.port, function() {
  console.log(`API is running in http://localhost:${config.port}`)
})
