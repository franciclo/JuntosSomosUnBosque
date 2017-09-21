var Festival = require('../../models/festival')

module.exports = function (req, res) {
  Festival.findOne({}, function (err, festi) {
    festi.titulo = req.body.titulo
    festi.descripcion = req.body.descripcion
    festi.descripcionLarga = req.body.descripcionLarga
    festi.fecha = req.body.fecha
    festi.locacion = req.body.locacion
    festi.save((err) => {
      if (err) return res.json({
        success: false,
        err: err,
        text: 'Hubo un problema.'
      })
      return res.json({
        success: true,
        text: 'Festi guardado.'
      })
    })
  })
}
