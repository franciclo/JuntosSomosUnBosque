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
        User.findOne({ 'local.email': email }, function (err, user) {
          if (err) return done(err)

          if (!user) {
            return done(null, false, {message: 'No user found.'})
          }

          user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err)
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Incorrect password.' })
            }
          })
        })
      })
    }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      if (email) email = email.toLowerCase()

      process.nextTick(function () {
        if (!req.user) {
          User.findOne({ 'local.email': email }, function (err, user) {
            if (err) return done(err)

            if (user) {
              return done(null, false, {message: 'That email is already taken.'})
            } else {
              var newUser = new User()

              newUser.local.email = email
              newUser.local.password = password

              newUser.save(function (err) {
                if (err) return done(err)
                return done(null, newUser)
              })
            }
          })
        // if the user is logged in but has no local account...
        } else if (!req.user.local.email) {
          // ...presumably they're trying to connect a local account
          // BUT let's check if the email used to connect a local account is being used by another user
          User.findOne({ 'local.email': email }, function (err, user) {
            if (err) return done(err)

            if (!user) return done(null, false, {message: 'That email is already taken.'})
            user = req.user
            user.local.email = email
            user.local.password = password
            user.save(function (err) {
              if (err) return done(err)

              return done(null, user)
            })
          })
        } else {
          // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
          return done(null, req.user)
        }
      })
    }))
}

module.exports.forgot = function (req, res) {
  var email = req.query.email

  User.findOne({ 'local.email': email }, function (err, user) {
    if (err) {
      res.json({success: false, text: 'Error al recuperar usuario', result: err})
      return
    }

    if (!user) {
      res.json({success: false, text: 'Usuario inexistente'})
      return
    }

    crypto.randomBytes(20, function (err, buf) {
      if (err) res.json({success: false, text: 'Error interno', result: err})

      var token = buf.toString('hex')
      var mailText = '<a href="http://localhost:3000/recuperar-clave?codigo=' +
        token + '">Recuperar contraseña</a>'

      user.local.resetPasswordToken = token
      user.local.resetPasswordExpires = Date.now() + 3600000 // 1 hour

      user.save(function (err) {
        if (err) res.json({success: false, text: 'Error al guardar usuario', result: err})
      })

      sendMail({
        from: 'francisco.pensa.web@gmail.com',
        to: [email],
        subject: 'test',
        html: mailText
      }).then(function (info) {
        res.json({success: true, text: 'Mail enviado, revisá tu bandeja de entrada', result: info})
      }, function (err) {
        res.json({success: false, text: 'Error al enviar el mail', result: err})
      })
    })
  })
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
      user: JSON.stringify(req.user)
    })
  })
}

module.exports.reset = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.query.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      return res.json({success: false, text: 'Error interno', result: err})
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error interno', result: err})
        return
      }
      req.logIn(user, function (err) {
        if (err) {
          res.json({success: false, text: 'Error interno', result: err})
          return
        }
        res.json({success: true, text: 'Contraseña cambiada, redireccionando..'})
      })
    })
  })
}
