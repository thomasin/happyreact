const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

const db = require('../db')
const User = require('../userDb')
const { checkNotLoggedIn } = require('../middleware.js')
const validation = require('../../utils/validation')


// Fake user (Dev ONLY)

function fakeUserMiddleware (req, res, next) {
  if (req && req.session && req.session.user_tmp) {
    req.user = req.session.user_tmp
  }
  if (next) { next() }
}

function fakeUserRoute (req, res) {
  let fakeUser = {
    email: 'thomasinthomasin@gmail.com',
    hashedPassword: bcrypt.hashSync('vanilla', 10),
    id: 203,
    verified: true
  }
  req.session = req.session || {}
  req.session.user_tmp = fakeUser
  res.redirect('/')
}

if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'test') {
  router.use(fakeUserMiddleware)
  router.get('/auth/fake', fakeUserRoute)
}

// Routes
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({verified: req.user.verified})
})

router.post('/checkEmail', (req, res) => {
  User.checkEmail(req.app.get('connection'), req.body.email)
    .then((email) => {
      let doesExist = !!email.length
      res.json({ doesExist })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/signup', (req, res) => {
  validation.isValidEmail_signUp(req.body.email, (checkedEmail) => {
    if (checkedEmail.valid && validation.isValidPassword_signUp(req.body.password).valid) {
      User.createUser(req.app.get('connection'), req.body.email, req.body.password)
        .then((id) => {
          req.login({email: req.body.email, password: req.body.password, id: id[0]}, (error) => {
            if (error) console.log(error)
            res.sendStatus(201)
          })
        })
        .catch((err) => {
          if (err.errno === 19) { res.sendStatus(409) } else res.sendStatus(500)
        })
    } else {
      res.sendStatus(400)
    }
  })
})


module.exports = router
