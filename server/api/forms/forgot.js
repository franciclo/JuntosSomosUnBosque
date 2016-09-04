var User = require('../../models/user')
var crypto = require('crypto')
var sendMail = require('../../mail')

module.exports = function (req, res) {
  var email = req.body.email

  User.findOne({ 'local.email': email }, function (err, user) {
    if (err) {
      return res.json({
        success: false,
        text: 'Error al recuperar usuario',
        result: err
      })
    }

    if (!user) {
      return res.json({
        success: false,
        text: 'Usuario inexistente'
      })
    }

    crypto.randomBytes(20, function (err, buf) {
      if (err) {
        return res.json({
          success: false,
          text: 'Error interno',
          result: err
        })
      }

      var token = buf.toString('hex')
      var mailText = '<a href="http://www.juntossomosunbosque.red/recuperar-clave?codigo=' +
        token + '">Restablecer contraseña de JuntosSomosUnBosque.red</a>'

      user.local.resetPasswordToken = token
      user.local.resetPasswordExpires = Date.now() + 3600000 * 24 // 24 hours

      user.save(function (err) {
        if (err) {
          res.json({
            success: false,
            text: 'Error al guardar usuario',
            result: err
          })
        }

        sendMail({
          to: [email],
          subject: 'Recuperar contraseña de Juntos Somos Un Bosque',
          html: mailText
        }).then(function (info) {
          res.json({
            success: true,
            text: 'Mail enviado, revisá tu bandeja de entrada',
            result: info
          })
        }, function (err) {
          res.json({
            success: false,
            text: 'Error al enviar el mail',
            result: err
          })
        })
      })
    })
  })
}
