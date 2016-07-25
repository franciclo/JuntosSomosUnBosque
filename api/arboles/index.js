var isLoggedIn = require('../auth/middleware').isLoggedIn
var User = require('../models/user')

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

    var arbolNew = {
      tamagno: req.query.tamagno,
      especie: req.query.especie,
      cantidad: +req.query.cantidad
    }

    var arbolI = user.arboles.map(function (arbol) {
      return arbol.especie + arbol.tamagno
    }).indexOf(arbolNew.especie + arbolNew.tamagno)

    if (typeof arbolNew.cantidad !== 'number') {
      arbolNew.cantidad = 0
    }

    if (~arbolI) {
      user.arboles[arbolI].cantidad = user.arboles[arbolI].cantidad + arbolNew.cantidad
    } else {
      user.arboles.push(arbolNew)
    }

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

  app.get('/edit_arbol', isLoggedIn, function (req, res) {
    var user = req.user

    var arbolChg = {
      tamagno: req.query.tamagno,
      especie: req.query.especie,
      cantidad: +req.query.cantidad
    }

    var arbolI = user.arboles.map(function (arbol) {
      return arbol.especie + arbol.tamagno
    }).indexOf(arbolChg.especie + arbolChg.tamagno)

    user.arboles[arbolI].cantidad = arbolChg.cantidad

    if (arbolChg.cantidad === 0) user.arboles.splice(arbolI, 1)
    user.save(function (err) {
      if (err) {
        res.json({success: false, text: 'Error al guardar los arboles'})
      }
      res.json({
        success: true,
        text: 'Guardado'
      })
    })
  })

  app.get('/todos_los_arboles', function (req, res) {
    User.find({}, function (err, users) {
      if (err) {
        res.json({
          success: false,
          text: 'Error al buscar arboles'
        })
      }
      var arboles = {}
      users
        .map(function (user) {
          return user.arboles
        })
        .forEach(function (arbolesByUser) {
          arbolesByUser
            .forEach(function (arbolGroup) {
              var bArboles = typeof arboles[arbolGroup.especie + arbolGroup.tamagno] === 'undefined'
              var accArbol = arboles[arbolGroup.especie + arbolGroup.tamagno]

              arboles[arbolGroup.especie + arbolGroup.tamagno] = {
                label: arbolGroup.especie + ' ' + arbolGroup.tamagno,
                cantidad: bArboles ? arbolGroup.cantidad : accArbol.cantidad + arbolGroup.cantidad
              }
            })
        })
      res.json({
        success: true,
        result: arboles
      })
    })
  })
}
