var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./userDb')


module.exports = function (app) {
  let connection = app.get('connection')
  app.use(require('cookie-parser')('keyboard cat'));
  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
  }));
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(connection, id)
      .then((user) => {
        done(user)
      })
      .catch(done)
  })

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findByEmail(connection, email)
        .then((user) => {
          if (!user) {
            return done(null, false)
          }
          User.comparePasswords(user.hashedPassword, password)
            .then((isCorrect) => {
              if (!isCorrect) { return done(null, false) }
              return done(null, user)
            })
        })
        .catch(done)
    }
  ))

  return passport
}
