module.exports = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local-login',
      function (err, user, info) {
        if (err) {
          return res.json({
            success: false,
            err: err,
            text: 'Datos incorrectos'
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
              text: 'Datos incorrectos'
            })
          }
          return res.json({
            success: true,
            result: {
              tipo: user.userType,
              primerLogin: user.primerLogin,
              location: {
                lat: user.location ? user.location.split('::')[0] : 0,
                lng: user.location ? user.location.split('::')[1] : 0
              },
              nombre: user.getNombre(),
              arboles: user.arboles
            }
          })
        })
      })(req, res, next)
  }
}
