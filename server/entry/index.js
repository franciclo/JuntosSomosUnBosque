var path = require('path')
var $tate = require('state-stream')
var User = require('../models/user')

module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    var formNoti = req.flash('formNotification')[0]
    if (formNoti) {
      $tate(formNoti.path).value = formNoti.value
    }

    if (req.isAuthenticated()) {
      $tate('yo').value = {
        primerLogin: req.user.primerLogin,
        name: req.user.getNombre(),
        type: req.user.userType,
        location: req.user.location,
        arboles: JSON.stringify(req.user.arboles)
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
              .map(function (arbol) {
                return {
                  tamagno: arbol.tamagno,
                  cantidad: arbol.cantidad,
                  especie: arbol.especie
                }
              })
          }
        })

      res.render('layout', {
        state: $tate().value
      })
    })
  })
}
