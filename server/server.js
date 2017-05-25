var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var db = require('./db')
var app = express()

// Middleware

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Routes

app.get('/getData', (req, res) => {
  db.getAllData(req.app.get('connection'))
    .then((data) => {
      console.log(data)
      res.json(data)
      res.end()
    })
    .catch(console.log)
})

app.get('/getAll', (req, res) => {
  db.getAll(req.app.get('connection'), req.query.tableName)
    .then((data) => {
      console.log(data)
      res.json(data)
      res.end()
    })
})

app.post('/add-variable', (req, res) => {
  db.addVariable(req.app.get('connection'), req.body.newVariable)
    .then(() => {
      res.sendStatus(200)
    })
})

app.post('/add-entry', (req, res) => {
  db.addEntry(req.app.get('connection'), req.body)
    .then((entry_id) => {
      req.body.variables.forEach((variable) => {
        db.addVariableEntry(req.app.get('connection'), variable, entry_id)
          .catch(console.log)
      })
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(console.log)
})

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
