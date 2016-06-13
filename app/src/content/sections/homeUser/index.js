require('../../assets/css/general.css')

require('component/form-vali')
require('component/pop-up')
require('component/geo-map')
require('component/svg-icon')

require('icon/user.svg')
require('icon/user.add.svg')
require('icon/social.facebook.svg')
require('icon/social.twitter.svg')
require('icon/social.google.svg')

require('./index.css')
var html = require('./index.html')
// var proceses = require('./proceses')

require('sections').register('home', html, function (dom) {
  function init () {
    // proceses(dom).init()
  }

  function destroy (s, f) {
  }

  return {
    init: init,
    destroy: destroy
  }
})
