var LocalStrategy = require('passport-local').Strategy
var User = require('../../models/user')
var sendMail = require('../../mail')
var crypto = require('crypto')

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function (req, email, password, done) {
    if (email) {
      email = email.toLowerCase() // Use lower-case e-mails to avoid case-sensitive e-mail matching
    }

    // asynchronous
    process.nextTick(function () {
      User.findOne({ 'local.email': email }, function (err, user) {
        // if there are any errors, return the error
        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, req.flash('formNotification', {path: 'loginForm.formNotification', value: {success: false, text: 'Usuario inexistente'}}))
        }

        if (!user.validPassword(password)) {
          return done(null, false, req.flash('formNotification', {path: 'loginForm.formNotification', value: {success: false, text: 'Contraseña incorrecta'}}))
        } else {
          return done(null, user)
        }
      })
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
    function (req, email, password, done) {
      if (email) {
        email = email.toLowerCase() // Use lower-case e-mails to avoid case-sensitive e-mail matching
      }

      // asynchronous
      process.nextTick(function () {
        // if the user is not already logged in:
        if (!req.user) {
          User.findOne({ 'local.email': email }, function (err, user) {
            // if there are any errors, return the error
            if (err) {
              return done(null, false, req.flash('formNotification', {path: 'signupForm.formNotification', value: {success: false, text: 'Error interno'}}))
            }

            // check to see if theres already a user with that email
            if (user) {
              return done(null, false, req.flash('formNotification', {path: 'signupForm.formNotification', value: {success: false, text: 'El mail ya esta siendo usado'}}))
            } else {
              var newUser = new User()

              newUser.local.email = email
              newUser.local.password = newUser.generateHash(password)

              newUser.save(function (err) {
                if (err) {
                  return done(null, false, req.flash('formNotification', {path: 'signupForm.formNotification', value: {success: false, text: 'Error creando usuario'}}))
                }

                return done(null, newUser)
              })
            }
          })
        // if the user is logged in but has no local account...
        } else if (!req.user.local.email) {
          // ...presumably they're trying to connect a local account
          // BUT let's check if the email used to connect a local account is being used by another user
          User.findOne({ 'local.email': email }, function (err, user) {
            if (err) {
              return done(err)
            }

            if (user) {
              return done(null, false, req.flash('formNotification', {path: 'signupForm.formNotification', value: {success: false, text: 'El mail ya esta siendo usado'}}))
            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
            } else {
              user = req.user
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
