var express = require('express')
var router = express.Router()
var passport = require('passport')
var jwt = require('jwt-simple')
var db = require('../db')
var secret = 'ef774e8a8f066ef7dbae8bf9388203310a4bbec5361b52291dfe1e686ed71e0d8138fe6a906e4543eac6753282638dc9f4ce9330aeea0680a0a0b7613c50a097c3b8a2500d473fbcd95ff6f0281ffd724b428bfbe35fad19d6665922d5ac5c84d0f3dbe7b3e44e6b'

// Routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  let token = jwt.encode({ user_token : req.user.id}, secret)
  res.json({ token })
})

router.post('/signup', (req, res) => {})

router.get('/logout', (req, res) => {
  req.logout()
  res.sendStatus(200)
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
