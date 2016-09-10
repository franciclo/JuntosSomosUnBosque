var path = require('path')

module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', require('./home'))
  app.get('/recuperar-clave', require('./reset'))
  app.get('/validar-mail', require('./validate-email'))
}
