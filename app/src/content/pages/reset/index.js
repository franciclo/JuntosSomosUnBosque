import '../../assets/css/general.css'
import './styles.css'
import html from './index.html'

import 'component/svg-icon'
import 'component/form-vali'
import 'component/pop-up'
import 'component/geo-map'
import Pages from 'pages'
import Proceses from './proceses'

Pages.register('reset', html, function (dom) {
  function init () {
    Proceses(dom).init()
  }

  function destroy (s, f) {
    Proceses(dom).destroy()
  }

  return {
    init: init,
    destroy: destroy
  }
})
