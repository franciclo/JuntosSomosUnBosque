var User = require('../../models/user')

module.exports = function (req, res) {
  User.findOne({
    'local.resetPasswordToken': req.body.codigo,
    'local.resetPasswordExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      return res.json({
        success: false,
        text: 'Error',
        err: err})
    }
    user.local.password = req.body.password
    user.local.resetPasswordToken = undefined
    user.local.resetPasswordExpires = undefined
    user.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          text: 'Error',
          result: err
        })
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json({
            success: false,
            text: 'Error',
            err: err
          })
        }
        res.json({
          success: true,
          result: null
        })
      })
    })
  })
}
