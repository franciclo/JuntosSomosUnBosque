var isLoggedIn = require('../auth/middleware').isLoggedIn

module.exports = function (app) {
  app.get('/finishRegistration', isLoggedIn, function (req, res) {
    var user = req.user
    user.primeraVez = false
    user.userType = req.query.userType
    user.location = req.query.location
    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error al guardar tu datos'})
      }
      res.json({
        success: true,
        text: 'Datos guardados',
        result: {
          type: req.query.userType,
          location: req.query.location
        }
      })
    })
  })

  app.get('/perfil', isLoggedIn, function (req, res) {
    var user = req.user
    user.userType = req.query.userType
    user.location = req.query.location
    user.name = req.query.nombre
    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error al guardar tu datos'})
      }
      res.json({
        success: true,
        text: 'Datos guardados',
        result: {
          name: req.query.nombre,
          type: req.query.userType,
          location: req.query.location
        }
      })
    })
  })

  app.get('/arboles', isLoggedIn, function (req, res) {
    var user = req.user

    var arbol = {
      tamagno: req.query.tamagno,
      especie: req.query.especie,
      cantidad: req.query.cantidad
    }

    user.arboles.push(arbol)

    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error al guardar los arboles'})
      }
      res.json({
        success: true,
        text: 'Arboles guardados',
        result: {
          arboles: user.arboles.map(function (arbol) {
            return {
              especie: arbol.especie,
              cantidad: arbol.cantidad,
              tamagno: arbol.tamagno
            }
          })
        }
      })
    })
  })
}
