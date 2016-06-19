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
      res.render('layout', {
        sectionHtml: '../../app/src/content/sections/homeUser/index.html',
        entryFilename: 'user'
      })
    } else {
      res.render('layout', {
        sectionHtml: '../../app/src/content/sections/homeGuest/index.html',
        entryFilename: 'guest',
        formNotification: formNoti
      })
    }
  })
}
