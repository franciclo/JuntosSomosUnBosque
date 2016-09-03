var User = require('../models/user')

module.exports = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.query.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      return res.redirect('/')
    }
    res.render('layout', {
      state: {
        nombre: user.getNombre(),
        reset: true
      }
    })
  })
}
