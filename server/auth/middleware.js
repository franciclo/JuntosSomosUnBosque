module.exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.json({
    success: false,
    text: 'Tenés que iniciar sesión.'
  })
}
