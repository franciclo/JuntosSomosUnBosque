var User = require('../models/user')

module.exports = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.query.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      return res.redirect('/')
    }
    var state = {}
    state.user = {
      nombre: user.getNombre(),
      email: user.local.email,
      reset: true
    }
    res.render('layout', {
      state: state
    })
  })
}
