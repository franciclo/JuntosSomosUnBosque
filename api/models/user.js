var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    name: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

// userSchema.pre('save', function (next) {
//   var user = this
//   var SALT_FACTOR = 5

//   if (!user.isModified('password')) return next()

//   bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
//     if (err) return next(err)

//     bcrypt.hash(user.password, salt, null, function (err, hash) {
//       if (err) return next(err)
//       user.password = hash
//       next()
//     })
//   })
// })

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err)
//     cb(null, isMatch)
//   })
// }

module.exports = mongoose.model('User', userSchema)
