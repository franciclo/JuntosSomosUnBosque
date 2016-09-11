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
      })
      .forEach(function (userArboles) {
        userArboles.forEach(function (uArbol) {
          var arbolI = arboles
              .map(function (arbol) {
                return [arbol.especie, arbol.tamagno].join('')
              })
              .indexOf([uArbol.especie, uArbol.tamagno].join(''))
          if (~arbolI) {
            arboles[arbolI].cantidad += uArbol.cantidad
          } else {
            arboles.push({
              especie: uArbol.especie,
              tamagno: uArbol.tamagno,
              cantidad: uArbol.cantidad
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
