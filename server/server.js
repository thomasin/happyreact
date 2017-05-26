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
      res.json(data)
      res.end()
    })
    .catch(console.log)
})

app.get('/getAll', (req, res) => {
  db.getAll(req.app.get('connection'), req.query.tableName)
    .then((data) => {
      res.json(data)
      res.end()
    })
})

app.post('/add-variable', (req, res) => {
  db.addVariable(req.app.get('connection'), req.body.variableName)
    .then(() => {
      res.sendStatus(200)
    })
})

app.post('/add-entry', (req, res) => {
  db.addEntry(req.app.get('connection'), req.body)
    .then((entry_id) => {
      let promises = []
      req.body.variables.forEach((variable) => {
        let promise = db.addVariableEntry(req.app.get('connection'), variable, entry_id[0])
        promises.push(promise)
      })
      return Promise.all(promises)
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
