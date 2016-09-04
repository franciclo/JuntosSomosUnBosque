var User = require('../models/user')

module.exports = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al buscar arboles'
      })
    }
    var arboles = []
    users
      .filter(function (user) {
        return user.arboles.length > 0
      })
      .map(function (user) {
        return user.arboles
            .map(function (arbol) {
              return {
                especie: arbol.especie,
                cantidad: arbol.cantidad
              }
            })
      })
      .forEach(function (userArboles) {
        userArboles.forEach(function (userArbol) {
          var arbolI = arboles
              .map(function (arbol) {
                return arbol.especie
              })
              .indexOf(userArbol.especie)
          if (~arbolI) {
            arboles[arbolI].cantidad += userArbol.cantidad
          } else {
            arboles.push({
              especie: userArbol.especie,
              cantidad: userArbol.cantidad
            })
          }
        })
      })
    res.json({
      success: true,
      result: arboles
    })
  })
}
