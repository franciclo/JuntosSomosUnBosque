module.exports = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local-login',
      function (err, user, info) {
        if (err) {
          return res.json({
            success: false,
            err: err,
            text: 'Datos incorrectos - err'
          })
        }
        if (!user) {
          return res.json({
            success: false,
            text: 'Datos incorrectos - no user'
          })
        }
        req.logIn(user, function (err) {
          if (err) {
            console.log(err)
            return res.json({
              success: false,
              text: 'Datos incorrectos - in err',
              err: err
            })
          }
          return res.json({
            success: true,
            result: {
              tipo: user.userType,
              primerLogin: user.primerLogin,
              location: user.location,
              nombre: user.getNombre(),
              arboles: user.arboles
            }
          })
        })
      })(req, res, next)
  }
}
