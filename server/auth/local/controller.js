var LocalStrategy = require('passport-local').Strategy
var User = require('../../models/user')
var sendMail = require('../../mail')
var crypto = require('crypto')

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    if (email) {
      email = email.toLowerCase()
    }
    process.nextTick(function () {
      User.findOne({ 'local.email': email },
        function (err, user) {
          if (err) {
            return done(err)
          }

          if (!user) {
            return done(null, false)
          }

          if (!user.validPassword(password)) {
            return done(null, false)
          } else {
            return done(null, user)
          }
        })
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    if (email) {
      email = email.toLowerCase()
    }

    process.nextTick(function () {
      if (!req.user) {
        User.findOne({ 'local.email': email }, function (err, user) {
          if (err) {
            return done(null, false)
          }

          if (user) {
            return done(null, false)
          } else {
            var newUser = new User()
            newUser.local.name = req.body.name
            newUser.local.email = email
            newUser.local.password = newUser.generateHash(password)

            newUser.save(function (err) {
              if (err) {
                return done(null, false)
              }

              return done(null, newUser)
            })
          }
        })
      } else if (!req.user.local.email) {
        User.findOne({ 'local.email': email }, function (err, user) {
          if (err) {
            return done(err)
          }

          if (user) {
            return done(null, false)
          } else {
            user = req.user
            user.local.name = req.body.name
            user.local.email = email
            user.local.password = user.generateHash(password)
            user.save(function (err) {
              if (err) {
                return done(err)
              }

              return done(null, user)
            })
          }
        })
      } else {
        return done(null, req.user)
      }
    })
  }))
}

module.exports.recuperar = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.query.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      console.log('err reset', err, user)
      return res.redirect('/')
    }
    res.render('layout', {
      sectionHtml: '../../app/src/content/sections/reset/index.html',
      entryFilename: 'reset',
      userMail: user.local.email
    })
  })
}

module.exports.reset = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.query.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      return res.json({success: false, text: 'Parece que el usuario ya no existe mas', result: err})
    }
    console.log(req.query.password)
    user.password = req.query.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Hubo un problema con tu usuario', result: err})
        return
      }
      req.logIn(user, function (err) {
        if (err) {
          res.json({success: false, text: 'Hubo un problema con tu nueva contraseña', result: err})
          return
        }
        res.json({success: true, text: 'Contraseña cambiada, redireccionando..'})
      })
    })
  })
}
