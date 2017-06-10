var express = require('express')
var router = express.Router()
var passport = require('passport')
var db = require('../db')
var User = require('../userDb')

// Routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})

router.get('/activeSession', (req, res) => {
  console.log(req)
  let activeSession = req.user ? true : false
  console.log(req.user)
  console.log(activeSession)
  res.json({ activeSession })
})

router.post('/checkEmail', (req, res) => {
  User.checkEmail(req.app.get('connection'), req.body.email)
    .then((email) => {
      let doesExist = email.length ? true : false
      res.json({ doesExist })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/signup', (req, res) => {
  User.createUser(req.app.get('connection'), req.body.email, req.body.password)
    .then((id) => {
      req.login({email: req.body.email, password: req.body.password, id: id[0]}, (error) => {
        if (error) console.log(error)
        res.sendStatus(201)
      })
    })
    .catch((err) => {
      if (err.errno === 19) {res.sendStatus(409)}
      else res.sendStatus(500)
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.sendStatus(200)
})

router.get('/getData', (req, res) => {
  db.getAllData(req.app.get('connection'), req.user.id)
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
    console.log(req.user)
    db.getAll(req.app.get('connection'), req.query.tableName, req.user.id)
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
  db.addVariable(req.app.get('connection'), req.body.variableName, req.user.id)
    .then(() => {
      res.sendStatus(201)
    })
    .catch(console.log)
})

router.post('/add-entry', (req, res) => {
  db.addEntry(req.app.get('connection'), req.body, req.user.id)
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
