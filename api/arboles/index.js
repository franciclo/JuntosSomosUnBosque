var isLoggedIn = require('../auth/middleware').isLoggedIn

module.exports = function (app) {
  app.get('/finishRegistration', isLoggedIn, function (req, res) {
    var user = req.user
    user.primeraVez = false
    user.userType = req.query.userType
    user.location = req.query.location
    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error al guardar tu datos'})
      }
      res.json({
        success: true,
        text: 'Datos guardados',
        result: {
          userType: req.query.userType,
          location: req.query.location
        }
      })
    })
  })
}
