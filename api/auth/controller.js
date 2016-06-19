var User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  require('./local/controller')(passport)
  require('./facebook/controller')(passport)
  require('./google/controller')(passport)
  require('./twitter/controller')(passport)
}
