import '../../assets/css/general.css'
import './styles.css'
import 'icon/user.svg'
import 'icon/triangle.svg'
import 'icon/apagar.svg'
import 'icon/plantin.svg'
import 'icon/social.facebook.svg'
import 'icon/social.twitter.svg'
import 'icon/social.google.svg'
import html from './index.html'

import 'component/svg-icon'
import 'component/form-vali'
import 'component/pop-up'
import 'component/geo-map'
import Pages from 'pages'
import Proceses from './proceses'
import Renders from './renders'

Pages.register('home', html, function (dom) {
  function init () {
    Proceses(dom).init()
    Renders(dom).init()
  }

  function destroy (s, f) {
    Proceses(dom).destroy()
    Renders(dom).destroy()
  }

  return {
    init: init,
    destroy: destroy
  }
})
