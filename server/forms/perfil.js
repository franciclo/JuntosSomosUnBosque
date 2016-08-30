module.exports = function (req, res) {
  var user = req.user
  user.userType = req.body.userType
  user.location = req.body.location
  user.name = req.body.nombre
  user.save(function (err) {
    if (err) {
      res.json({
        success: false,
        text: 'Hubo un error al guardar tu datos'
      })
    }
    res.json({
      success: true,
      text: 'Datos guardados',
      result: {
        userType: user.userType,
        location: user.location,
        nombre: user.name
      }
    })
  })
}
