var config = require('../../config')
module.exports = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local-login',
      function (err, user, info) {
        if (err) {
          return res.json({
            success: false,
            err: err,
            text: 'Hubo un error intente mas tarde'
          })
        }
        if (!user) {
          return res.json({
            success: false,
            text: 'Datos incorrectos'
          })
        }
        req.logIn(user, function (err) {
          if (err) {
            return res.json({
              success: false,
              text: 'Datos incorrectos',
              err: err
            })
          }

          var userClient = {
            tipo: user.userType,
            primerLogin: user.primerLogin,
            location: user.location,
            nombre: user.getNombre(),
            arboles: user.arboles
          }

          if (config.admins.includes(req.user.getEmail())) {
            userClient.isAdmin = true
          }

          return res.json({
            success: true,
            result: userClient
          })
        })
      })(req, res, next)
  }
}
