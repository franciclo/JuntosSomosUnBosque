module.exports = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.render('layout', {
      state: {}
    })
  }

  var userClient = {
    primerLogin: req.user.primerLogin,
    nombre: req.user.getNombre(),
    type: req.user.userType,
    location: req.user.location,
    arboles: req.user.arboles
      .map(function (arbol) {
        return {
          especie: arbol.especie,
          cantidad: arbol.cantidad,
          tamagno: arbol.tamagno
        }
      })
  }
  return res.render('layout', {
    state: {
      user: userClient
    }
  })
}
