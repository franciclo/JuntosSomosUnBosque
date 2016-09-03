var User = require('../models/user')

module.exports = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al buscar arboles'
      })
    }
    try {
      var red = users
        .filter(function (user) {
          return user.arboles.length > 0
        })
        .filter(function (user) {
          return user.location
        })
        .map(function (user) {
          return {
            tipo: user.userType,
            location: JSON.parse(user.location),
            nombre: user.getNombre(),
            arboles: user.arboles
              .map(function (arbol) {
                return {
                  especie: arbol.especie,
                  cantidad: arbol.cantidad,
                  tamagno: arbol.tamagno
                }
              })
          }
        })
    } catch (err) {
      res.json({
        success: false,
        text: 'Error al parsear arboles'
      })
    }
    res.json({
      success: true,
      result: red
    })
  })
}
