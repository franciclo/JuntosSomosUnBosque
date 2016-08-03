var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  userType: String,
  location: String,
  name: String,
  arboles: [
    {
      tamagno: String,
      cantidad: Number,
      especie: String
    }
  ],
  primeraVez: {
    type: Boolean,
    default: true
  },
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

userSchema.methods.getNombre = function () {
  var userName = 'Usuario'
  if (this.name) {
    userName = this.name
  } else if (this.google.name) {
    userName = this.google.name
  } else if (this.twitter.displayName) {
    userName = this.twitter.displayName
  } else if (this.facebook.name) {
    userName = this.facebook.name
  } else if (this.local.name) {
    userName = this.local.name
  }
  return userName
}

module.exports = mongoose.model('User', userSchema)
