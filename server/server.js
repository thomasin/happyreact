var express = require('express')
var bodyParser = require('body-parser')
var passport = require('./passport')
var session = require('express-session')
var flash = require('connect-flash')
var index = require('./routes/index')

// Middleware
module.exports = (connection) => {
  var app = express()
  
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.use(flash())
  app.set('connection', connection)

  passport(app)

  app.use('/', index)
  return app
}
