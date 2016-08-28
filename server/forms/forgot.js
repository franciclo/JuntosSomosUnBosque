var User = require('../models/user')
var crypto = require('crypto')
var sendMail = require('../mail')

module.exports = function (req, res) {
  var email = req.query.email

  User.findOne({ 'local.email': email }, function (err, user) {
    if (err) {
      res.json({success: false, text: 'Error al recuperar usuario', result: err})
      return
    }

    if (!user) {
      res.json({success: false, text: 'Usuario inexistente'})
      return
    }

    crypto.randomBytes(20, function (err, buf) {
      if (err) res.json({success: false, text: 'Error interno', result: err})

      var token = buf.toString('hex')
      var mailText = '<a href="http://www.juntossomosunbosque.red/recuperar-clave?codigo=' +
        token + '">Recuperar contraseña de JuntosSomosUnBosque.red</a>'

      user.local.resetPasswordToken = token
      user.local.resetPasswordExpires = Date.now() + 3600000 // 1 hour

      user.save(function (err) {
        if (err) res.json({success: false, text: 'Error al guardar usuario', result: err})
      })

      sendMail({
        from: 'noreply@JuntosSomosUnBosque.red',
        to: [email],
        subject: 'test',
        html: mailText
      }).then(function (info) {
        res.json({success: true, text: 'Mail enviado, revisá tu bandeja de entrada', result: info})
      }, function (err) {
        res.json({success: false, text: 'Error al enviar el mail', result: err})
      })
    })
  })
}
