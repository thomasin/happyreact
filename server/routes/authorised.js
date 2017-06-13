const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const db = require('../db')
const User = require('../userDb')
const validation = require('../../utils/validation')
const { checkLoggedIn, checkTableWhitelist, checkVariablesValid, checkNewVariableValid } = require('../middleware.js')

router.use(checkLoggedIn)

// Routes

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
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

router.get('/getAll', checkTableWhitelist, (req, res) => {
    db.getAll(req.app.get('connection'), req.query.tableName, req.user.id)
      .then((data) => {
        res.json(data)
        res.end()
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
})

router.post('/add-variable', checkNewVariableValid, (req, res) => {
    db.addVariable(req.app.get('connection'), req.body.variableName, req.user.id)
      .then(() => {
        res.sendStatus(201)
      })
      .catch(console.log)
})


router.post('/add-entry', checkVariablesValid, (req, res) => {
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
