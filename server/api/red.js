var User = require('../models/user')

module.exports = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al buscar arboles'
      })
    }
    var red = users
      .filter(function (user) {
        return user.arboles.length > 0
      })
      .map(function (user) {
        return {
          tipo: user.userType,
          location: user.location,
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
    res.json({
      success: true,
      result: red
    })
  })
}
