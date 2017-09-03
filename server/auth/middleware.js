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
    if (config.admins.includes(req.user.getEmail())) {
      return next()
    }
    res.json({
      success: false,
      text: 'Vo no so admin.'
    })
  }
  res.json({
    success: false,
    text: 'Tenés que iniciar sesión.'
  })
}
