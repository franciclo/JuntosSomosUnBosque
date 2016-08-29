module.exports = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local-signup',
      function (err, user, info) {
        if (err) {
          return res.json({
            success: false,
            err: err,
            text: 'Hubo un problema, intentá mas tarde.'
          })
        }
        if (!user) {
          return res.json({
            success: false,
            text: 'Ese mail ya está registrado'
          })
        }
        req.logIn(user, function (err) {
          if (err) {
            return res.json({
              success: false,
              err: err,
              text: 'Hubo un problema, intentá mas tarde.'
            })
          }
          return res.json({
            success: true,
            result: {
              tipo: user.userType,
              primerLogin: user.primerLogin,
              location: {
                lat: 0,
                lng: 0
              },
              nombre: user.getNombre(),
              arboles: user.arboles
            }
          })
        })
      })(req, res, next)
  }
}
