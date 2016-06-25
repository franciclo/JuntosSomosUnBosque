var path = require('path')
module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    var formNoti = req.flash('formNotification')[0]
    if (formNoti) {
      formNoti.value = JSON.stringify(formNoti.value)
      console.log(formNoti)
    }

    if (req.isAuthenticated()) {
      var userName = 'Usuario'
      if (req.user.google.name) {
        userName = ~req.user.google.name.indexOf(' ')
          ? req.user.google.name.split(' ')[0] : req.user.google.name
      } else if (req.user.twitter.displayName) {
        userName = req.user.twitter.displayName
      } else if (req.user.facebook.name) {
        userName = ~req.user.facebook.name.indexOf(' ')
          ? req.user.facebook.name.split(' ')[0] : req.user.facebook.name
      } else if (req.user.local.name) {
        userName = req.user.local.name
      }
      res.render('layout', {
        sectionHtml: '../../app/src/content/pages/homeUser/index.html',
        entryFilename: 'user',
        userName: userName
      })
    } else {
      res.render('layout', {
        sectionHtml: '../../app/src/content/pages/homeGuest/index.html',
        entryFilename: 'guest',
        formNotification: formNoti
      })
    }
  })
}
