var User = require('../models/user')

module.exports = function (req, res) {
  User.findOne({
    'emailVerificationToken': req.query.codigo,
    'emailVerificationExpires': { $gt: Date.now() }
  }, function (err, user) {
    if (err || !user) {
      console.log('error findOne validate email')
      return res.redirect('/')
    }
    User.findOne({'email': user.email, 'emailVerified': true},
      function (err, _user) {
        if (err) {
          console.log('error get users with this email')
          return res.redirect('/')
        }
        if (_user) {
          user.emailVerified = false
          user.emailVerificationSent = false
          user.emailVerificationExpires = undefined
          user.emailVerificationToken = undefined
          user.save(function (err) {
            if (err) console.log('error save user on email taken')
          })
          return res.redirect('/')
        }
        if (user.localRegistry) {
          user.local.name = user.getNombre()
          user.local.email = user.email
          user.local.password = user.unofficialPassword
        }
        user.emailVerificationExpires = undefined
        user.emailVerificationToken = undefined
        user.emailVerified = true
        user.save(function (err) {
          if (err) {
            console.log('error save')
            return res.redirect('/')
          }
          req.logIn(user, function (err) {
            if (err) {
              console.log('error login verify email')
              return res.redirect('/')
            }
            return res.redirect('/')
          })
        })
      })
  })
}
