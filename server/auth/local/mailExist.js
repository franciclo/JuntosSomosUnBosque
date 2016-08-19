var User = require('../../models/user')
module.exports = function (bool) {
  return function (mail) {
    return new Promise(function (resolve, reject) {
      User.findOne({ 'local.email': mail }, function (err, user) {
        resolve(!(err || !user) ? bool : !bool)
      })
    })
  }
}
