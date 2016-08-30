var isLoggedIn = require('../auth/middleware').isLoggedIn
var upload = require('multer')()

module.exports = function (app, passport) {
  app.use(upload.single())

  app.post('/voluntarios', require('./voluntarios'))

  app.post('/login', require('./login')(passport))

  app.post('/registro', require('./registro')(passport))

  app.post('/terminar-registro', isLoggedIn, require('./terminar-registro'))

  app.post('/perfil', isLoggedIn, require('./perfil'))

  app.post('/forgot', require('./forgot'))
}

  // app.get('/arboles', isLoggedIn, function (req, res) {
  //   var user = req.user

  //   var arbolNew = {
  //     tamagno: req.query.tamagno,
  //     especie: req.query.especie,
  //     cantidad: +req.query.cantidad
  //   }

  //   var arbolI = user.arboles.map(function (arbol) {
  //     return arbol.especie + arbol.tamagno
  //   }).indexOf(arbolNew.especie + arbolNew.tamagno)

  //   if (typeof arbolNew.cantidad !== 'number') {
  //     arbolNew.cantidad = 0
  //   }

  //   if (~arbolI) {
  //     user.arboles[arbolI].cantidad = user.arboles[arbolI].cantidad + arbolNew.cantidad
  //   } else {
  //     user.arboles.push(arbolNew)
  //   }

  //   user.save(function (err) {
  //     if (err) {
  //       res.json({success: false, text: 'Error al guardar los arboles'})
  //     }
  //     res.json({
  //       success: true,
  //       text: 'Arboles guardados',
  //       result: {
  //         arboles: user.arboles.map(function (arbol) {
  //           return {
  //             especie: arbol.especie,
  //             cantidad: arbol.cantidad,
  //             tamagno: arbol.tamagno
  //           }
  //         })
  //       }
  //     })
  //   })
  // })

  // app.get('/edit_arbol', isLoggedIn, function (req, res) {
  //   var user = req.user

  //   var arbolChg = {
  //     tamagno: req.query.tamagno,
  //     especie: req.query.especie,
  //     cantidad: +req.query.cantidad
  //   }

  //   var arbolI = user.arboles.map(function (arbol) {
  //     return arbol.especie + arbol.tamagno
  //   }).indexOf(arbolChg.especie + arbolChg.tamagno)

  //   user.arboles[arbolI].cantidad = arbolChg.cantidad

  //   if (arbolChg.cantidad === 0) user.arboles.splice(arbolI, 1)
  //   user.save(function (err) {
  //     if (err) {
  //       res.json({success: false, text: 'Error al guardar los arboles'})
  //     }
  //     res.json({
  //       success: true,
  //       text: 'Guardado',
  //       arboles: user.arboles.map(function (arbol) {
  //         return {
  //           especie: arbol.especie,
  //           cantidad: arbol.cantidad,
  //           tamagno: arbol.tamagno
  //         }
  //       })
  //     })
  //   })
  // })

  // app.get('/todos_los_arboles', function (req, res) {
  //   User.find({}, function (err, users) {
  //     if (err) {
  //       res.json({
  //         success: false,
  //         text: 'Error al buscar arboles'
  //       })
  //     }
  //     var allUsers = users
  //       .map(function (user) {
  //         return {
  //           tipo: user.userType,
  //           loc: user.location,
  //           nombre: user.getNombre(),
  //           arboles: user.arboles
  //             .map(function (arbol) {
  //               return {
  //                 tamagno: arbol.tamagno,
  //                 cantidad: arbol.cantidad,
  //                 especie: arbol.especie
  //               }
  //             })
  //         }
  //       })

  //     res.json({
  //       success: true,
  //       result: allUsers
  //     })
  //   })
  // })
