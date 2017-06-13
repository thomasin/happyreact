var express = require('express')
var bodyParser = require('body-parser')
var passport = require('./passport')
var session = require('express-session')
var flash = require('connect-flash')

var unauthorised = require('./routes/unauthorised')
var authorised = require('./routes/authorised')


// Middleware
module.exports = (connection) => {
  var app = express()
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.set('connection', connection)

  passport(app)

  app.use('/', unauthorised)
  app.use('/dashboard', authorised)

  return app
}
