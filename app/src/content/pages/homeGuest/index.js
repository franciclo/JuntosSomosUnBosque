import '../../assets/css/general.css'
import './styles.css'

import 'icon/user.svg'
import 'icon/arboles.Aliso.svg'
import 'icon/arboles.Caranday.svg'
import 'icon/arboles.Chica.svg'
import 'icon/arboles.Sen.svg'
import 'icon/arboles.Algarrobo.svg'
import 'icon/arboles.Ceibo.svg'
import 'icon/arboles.Vinal.svg'
import 'icon/arboles.Tala.svg'
import 'icon/arboles.Sombra.svg'
import 'icon/arboles.Curupay.svg'
import 'icon/arboles.Chal.svg'
import 'icon/arboles.Brea.svg'
import 'icon/arboles.Coronillo.svg'
import 'icon/plantin.svg'
import 'icon/lugar.svg'
import 'icon/info.svg'
import 'icon/arrow.left.svg'
import 'icon/social.facebook.svg'
import 'icon/social.twitter.svg'
import 'icon/social.google.svg'

import html from './index.html'

import 'component/svg-icon'
import 'component/form-vali'
import 'component/pop-up'
import 'component/side-bar'
import 'component/geo-map'
import 'component/scroll-items'
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
