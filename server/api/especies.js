var Especie = require('../models/especie')

module.exports = function (req, res) {
  Especie.find({}, function (err, especies) {
    if (err) {
      return res.json(
        {
          success: false,
          error: 'Error interno'
        })
    }
    if (especies.length > 0) {
      return res.json(
        {
          success: true,
          result: especies
        })
    } else {
      return res.json(
        {
          success: false,
          error: 'No hay especies'
        })
    }
  })
}
