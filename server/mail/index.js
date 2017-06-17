var nodemailer = require('nodemailer')
var config = require('../config').mailer
module.exports = (function () {
  var transporter = nodemailer.createTransport(config.transport)

  function send (options) {
    if (!options) throw new Error('no options in send mail')
    return new Promise(function (resolve, reject) {
      transporter.sendMail(opts, function (err, info) {
        if (err) {
          console.log('send mail error', err)
          reject(err)
        } else {
          resolve(info)
        }
      })
    })
  }

  return send
}())
