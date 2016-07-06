var path = require('path')
module.exports = function (app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname))

  app.get('/', function (req, res) {
    var formNoti = req.flash('formNotification')[0]
    if (formNoti) {
      formNoti.value = JSON.stringify(formNoti.value)
    }

    if (req.isAuthenticated()) {
      var userName = 'Usuario'
      if (req.user.google.name) {
        userName = req.user.google.name
      } else if (req.user.twitter.displayName) {
        userName = req.user.twitter.displayName
      } else if (req.user.facebook.name) {
        userName = req.user.facebook.name
      } else if (req.user.local.name) {
        userName = req.user.local.name
      }

      if (req.user.primeraVez) {
        res.render('layout', {
          entryFilename: 'user',
          userName: userName,
          primeraVez: true
        })
      } else {
        res.render('layout', {
          entryFilename: 'user',
          userName: userName,
          userType: req.user.userType,
          location: req.user.location
        })
      }
    } else {
      res.render('layout', {
        entryFilename: 'guest',
        formNotification: formNoti
      })
    }
  })
}
