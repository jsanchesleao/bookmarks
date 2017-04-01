const express = require('express')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token');

const routes  = require('./routes')

const config  = require('../config.json')

const app = express()

app.use(bodyParser.json())
app.use(bearerToken())

routes(app)

app.listen(config.port, function() {
  console.log(`API is running in http://localhost:${config.port}`)
})
