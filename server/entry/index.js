var path = require('path')
var $tate = require('state-stream')
var User = require('../models/user')

module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      console.log(req.user)
      $tate('user').value = {
        primerLogin: req.user.primerLogin,
        nombre: req.user.getNombre(),
        type: req.user.userType,
        location: req.user.location,
        arboles: req.user.arboles && req.user.arboles
          .map(function (arbol) {
            return {
              especie: arbol.especie,
              cantidad: arbol.cantidad,
              tamagno: arbol.tamagno
            }
          })
      }
    }

    User.find({}, function (err, users) {
      if (err) {
        res.json({
          success: false,
          text: 'Error al buscar arboles'
        })
      }
      $tate('red').value = users
        .filter(function (user) {
          return user.arboles.length > 0
        })
        .map(function (user) {
          return {
            tipo: user.userType,
            location: user.location,
            nombre: user.getNombre(),
            arboles: user.arboles
          }
        })

      res.render('layout', {
        state: $tate().value
      })
    })
  })
}
