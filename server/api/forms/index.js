var m = require('../../auth/middleware')
var upload = require('multer')()

module.exports = function (app, passport) {
  app.use(upload.single())

  app.post('/voluntarios', require('./voluntarios'))
  app.post('/save-arboles', m.isLoggedIn, require('./save-arboles'))
  app.post('/perfil', m.isLoggedIn, require('./perfil'))
  app.post('/login', require('./login')(passport))
  app.post('/registro', require('./registro'))
  app.post('/terminar-registro', m.isLoggedIn, require('./terminar-registro'))
  app.post('/forgot', require('./forgot'))
  app.post('/reset', require('./reset'))
  app.post('/mail-verification', require('./mail-verification'))
  app.post('/edit-festival', m.isAdmin, require('./edit-festi'))
}
