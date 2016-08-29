var Voluntario = require('../models/voluntario')

module.exports = function (req, res, next) {
  var newVoluntario = new Voluntario()
  newVoluntario.nombre = req.body.nombre
  newVoluntario.apellido = req.body.apellido
  newVoluntario.mail = req.body.mail
  newVoluntario.telefono = req.body.telefono
  newVoluntario.area = req.body.area
  newVoluntario.comentario = req.body.comentario

  newVoluntario.save(function (err) {
    if (err) {
      res.json({
        success: false,
        err: err,
        text: 'Hubo un problema, intentá mas tarde.'
      })
      return
    }
    res.json({
      success: true,
      result: req.body,
      text: 'Gracias por sumarte, y ser parte de este festival autogestivo. Te vamos a estar contactando via mail.'
    })
  })
}
