var path = require('path')
module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    var formNoti = req.flash('formNotification')[0]
    if (formNoti) {
      formNoti.value = JSON.stringify(formNoti.value)
    }

    if (req.isAuthenticated()) {
      
      if (req.user.primeraVez) {
        res.render('layout', {
          entryFilename: 'user',
          userName: req.user.getNombre(),
          primeraVez: true
        })
      } else {
        res.render('layout', {
          entryFilename: 'user',
          userName: req.user.getNombre(),
          userType: req.user.userType,
          location: req.user.location,
          arboles: JSON.stringify(req.user.arboles
            .map(function (arbol) {
              return {
                especie: arbol.especie,
                cantidad: arbol.cantidad,
                tamagno: arbol.tamagno
              }
            })
          )
        })
      }
    } else {
      res.render('layout', {
        entryFilename: 'guest',
        formNotification: formNoti
      })
    }
  })
}
