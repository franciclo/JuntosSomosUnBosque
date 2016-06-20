;(function () {
  require('page/homeGuest/index.js')

  document.addEventListener('DOMContentLoaded', function () {
    require('history').go('home')
  })
}())
