var Festival = require('../models/festival')

module.exports = function (req, res) {
  Festival.findOne({}, function (err, festival) {
    if (err) {
      res.json({
        success: false,
        text: 'Error al buscar arboles'
      })
    }

    res.json({
      success: true,
      result: festival
    })
  })
}
