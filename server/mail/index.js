var nodemailer = require('nodemailer')
var config = require('../config').mailer
module.exports = (function () {
  var transporter = nodemailer.createTransport(config.transport)

  function send (options) {
    if (!options) throw new Error('no options in send mail')
    var opts = config.message
    Object.keys(options)
      .forEach(function (key) {
        opts[key] = options[key]
      })
    return transporter.sendMail(opts)
  }

  return send
}())
