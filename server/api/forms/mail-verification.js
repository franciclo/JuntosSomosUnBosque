var User = require('../../models/user')
var crypto = require('crypto')
var sendMail = require('../../mail')

module.exports = function (req, res, next) {
  User.findOne({'email': req.body.email, 'emailVerified': true},
    function (err, user) {
      if (err) {
        return res.json({
          success: false,
          err: err,
          text: 'Hubo un problema, intentá mas tarde.'
        })
      }
      if (user) {
        return res.json({
          success: false,
          text: 'Ese mail ya está registrado'
        })
      }

      req.user.email = req.body.email

      crypto.randomBytes(20, function (err, buf) {
        if (err) {
          return res.json({
            success: false,
            text: 'Error interno',
            result: err
          })
        }

        var token = buf.toString('hex')
        var mailText = '<a href="http://www.juntossomosunbosque.red/validar-mail?codigo=' +
          token + '">Validar cuenta de JuntosSomosUnBosque.red</a>'

        req.user.emailVerificationToken = token
        req.user.emailVerificationExpires = Date.now() + 3600000 * 24 // 24 hours

        sendMail({
          to: [req.body.email],
          subject: 'Validar cuenta de Juntos Somos Un Bosque',
          html: mailText
        }).then(function (info) {
          req.user.emailVerificationSent = true
          req.user.save(function (err) {
            if (err) {
              res.json({
                success: false,
                text: 'Error al guardar usuario',
                result: err
              })
            }
            res.json({
              success: true,
              text: 'Mail enviado, revisá tu bandeja de entrada y validá tu cuenta.',
              result: info
            })
          })
        }, function (err) {
          res.json({
            success: false,
            text: 'Error al enviar el mail de verificación',
            result: err
          })
        })
      })
    })
}
