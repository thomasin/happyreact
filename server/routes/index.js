var express = require('express')
var router = express.Router()
var passport = require('passport')
var db = require('../db')

// Routes

router.get('/', (req, res) => {
  console.log(req.user)
  res.send('home')
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user)
})

router.post('/signup', (req, res) => {})

router.get('/logout', (req, res) => {
  console.log(req.user)
  req.logout()
  res.redirect('/')
})

router.get('/getData', (req, res) => {
  db.getAllData(req.app.get('connection'))
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.get('/getAll', (req, res) => {
  let whiteList = ['variable', 'entry']
  if (!whiteList.includes(req.query.tableName)) {
    res.sendStatus(401)
  } else {
    db.getAll(req.app.get('connection'), req.query.tableName)
      .then((data) => {
        res.json(data)
        res.end()
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
  }
})

router.post('/add-variable', (req, res) => {
  db.addVariable(req.app.get('connection'), req.body.variableName)
    .then(() => {
      res.sendStatus(201)
    })
    .catch(console.log)
})

router.post('/add-entry', (req, res) => {
  db.addEntry(req.app.get('connection'), req.body)
    .then((entryId) => {
      let promises = []
      req.body.variables.forEach((variable) => {
        let promise = db.addVariableEntry(req.app.get('connection'), variable, entryId[0])
        promises.push(promise)
      })
      return Promise.all(promises)
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(console.log)
})

module.exports = router