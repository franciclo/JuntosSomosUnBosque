var path = require('path')
var $tate = require('state-stream')

module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    var formNoti = req.flash('formNotification')[0]
    if (formNoti) {
      $tate(formNoti.path).value = formNoti.value
    }

    if (req.isAuthenticated()) {
      $tate('user').value = {
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
    res.render('layout', {
      state: $tate().value
    })
  })
}
