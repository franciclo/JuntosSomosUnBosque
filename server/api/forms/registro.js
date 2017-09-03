var User = require('../../models/user')
var crypto = require('crypto')
var sendMail = require('../../mail')

module.exports = function (req, res, next) {
  User.findOne({'local.email': req.body.email},
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
      var newUser = new User()
      newUser.name = req.body.name
      newUser.unofficialPassword = newUser.generateHash(req.body.password)
      newUser.email = req.body.email
      newUser.localRegistry = true

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

        newUser.emailVerificationToken = token
        newUser.emailVerificationExpires = Date.now() + 3600000 * 24 // 24 hours
        sendMail({
          to: [req.body.email],
          subject: 'Validar cuenta de Juntos Somos Un Bosque',
          html: mailText
        }).then(function (info) {
          newUser.emailVerificationSent = true
          newUser.save(function (err) {
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
        })
        .catch(function (err) {
          res.json({
            success: false,
            text: 'Error al enviar el mail de verificación',
            result: err
          })
        })
      })
    })
}
