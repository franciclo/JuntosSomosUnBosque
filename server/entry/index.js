var path = require('path')
var $tate = require('state-stream')
var User = require('../models/user')

module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      console.log('isAuthenticated')
      $tate('yo').value = {
        primerLogin: req.user.primerLogin,
        name: req.user.getNombre(),
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
        .map(function (user) {
          return {
            tipo: user.userType,
            location: {
              lat: user.location ? user.location.split('::')[0] : 0,
              lng: user.location ? user.location.split('::')[1] : 0
            },
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
