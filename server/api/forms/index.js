var isLoggedIn = require('../../auth/middleware').isLoggedIn
var upload = require('multer')()

module.exports = function (app, passport) {
  app.use(upload.single())

  app.post('/voluntarios', require('./voluntarios'))
  app.post('/save-arboles', isLoggedIn, require('./save-arboles'))
  app.post('/perfil', isLoggedIn, require('./perfil'))
  app.post('/login', require('./login')(passport))
  app.post('/registro', require('./registro'))
  app.post('/terminar-registro', isLoggedIn, require('./terminar-registro'))
  app.post('/forgot', require('./forgot'))
  app.post('/reset', require('./reset'))
  app.post('/mail-verification', require('./mail-verification'))
}
