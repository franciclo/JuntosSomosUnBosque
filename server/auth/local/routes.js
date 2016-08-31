var isLoggedIn = require('../middleware').isLoggedIn

module.exports = function (app, passport) {
  // =============================================================================
  // LOCAL =======================================================================
  // =============================================================================

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
