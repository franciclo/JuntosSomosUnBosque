var isLoggedIn = require('../middleware').isLoggedIn

module.exports = function (app, passport) {
  // =============================================================================
  // LOCAL =======================================================================
  // =============================================================================

  app.post('/registro',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  )

  // app.post('/login',
  //   passport.authenticate('local-login', {
  //     successRedirect: '/',
  //     failureRedirect: '/'
  //   })
  // )





  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return res.json({
          success: false,
          result: err
        })
      }
      if (!user) { 
        return res.json({
          success: false,
          result: 'no user'
        })
      }
      req.logIn(user, function(err) {
        if (err) { 
          return res.json({
            success: false,
            result: 'in login err'
          })
        }
        return res.json({
          success: true,
          result: user
        })
      });
    })(req, res, next);
  });

















  app.get('/forgot', require('./controller').forgot)

  app.get('/recuperar-clave', require('./controller').recuperar)

  app.get('/reset', require('./controller').reset)

  // unlink -----------------------------------

  app.get('/unlink/local', isLoggedIn,
    function (req, res) {
      var user = req.user
      user.local.email = undefined
      user.local.password = undefined
      user.save(function (err) {
        if (err) {
          res.json({success: false})
        }
        res.json({success: true})
      })
    }
  )
}
