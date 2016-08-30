module.exports = function (req, res) {
  var user = req.user
  user.primerLogin = false
  user.userType = req.body.userType
  user.location = req.body.location
  user.save(function (err) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al guardar tu datos'
      })
    }
    res.json({
      success: true,
      text: 'Datos guardados',
      result: {
        type: user.userType,
        location: user.location
      }
    })
  })
}
