var User = require('../models/user')
var Especie = require('../models/especie')

module.exports = function (req, res) {
  User.find({}, function (err, _users) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al buscar arboles'
      })
    }
    Especie.populate(_users, {path: 'arboles.especie'}, function (err, users) {
      if (err) {
        res.json({
          success: false,
          text: 'Error al buscar especies de arboles'
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
                  especie: {
                    label: arbol.especie.plural,
                    id: arbol.especie.id
                  },
                  cantidad: arbol.cantidad
                }
              })
        })
        .forEach(function (userArboles) {
          var arbolesI = arboles
              .map(function (arbol) {
                return arbol.id
              })
              .indexOf(userArboles.especie.id)
          if (~arbolesI) {
            arboles[arbolesI].cantidad += userArboles.cantidad
          } else {
            arboles.push({
              id: userArboles.especie.id,
              cantidad: userArboles.cantidad
            })
          }
        })
      res.json({
        success: true,
        result: arboles
      })
    })
  })
}
