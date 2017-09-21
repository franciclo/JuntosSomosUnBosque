var config = require('../config')

module.exports = function (req, res) {
  var userClient = {}
  console.log('config.admins', config.admins, config.admins.includes)
  if (req.isAuthenticated()) {
    userClient.nombre = req.user.getNombre()
    if (!req.user.emailVerified) {
      userClient.emailVerified = false
      if (req.user.emailVerificationSent) {
        userClient.emailVerificationSent = true
        userClient.emailToVerify = req.user.email
      }
    } else if (req.user.primerLogin) {
      userClient.primerLogin = true
    } else {
      userClient.type = req.user.userType
      console.log(config.admins)
      if (config.admins.includes(req.user.getEmail())) {
        userClient.isAdmin = true
      }
      userClient.type = req.user.userType
      userClient.location = req.user.location
      userClient.arboles = req.user.arboles
        .map(function (arbol) {
          return {
            especie: arbol.especie,
            cantidad: arbol.cantidad,
            tamagno: arbol.tamagno
          }
        })
    }
  }
  return res.render('layout', {
    state: req.isAuthenticated()
      ? { user: userClient }
      : {}
  })
}
