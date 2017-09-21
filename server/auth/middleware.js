var config = require('../config')

module.exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.json({
    success: false,
    text: 'Tenés que iniciar sesión.'
  })
}

module.exports.isAdmin = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (~config.admins.indexOf(req.user.getEmail())) {
      return next()
    }
    res.json({
      success: false,
      text: 'No tienes permiso.'
    })
  }
  res.json({
    success: false,
    text: 'Tenés que iniciar sesión.'
  })
}
