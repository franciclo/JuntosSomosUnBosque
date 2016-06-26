import './styles.css'
import 'component/svg-icon'
import 'icon/chevron.right.svg'
import 'icon/chevron.left.svg'

import Components from 'components'
import Renders from './renders'
import Proceses from './proceses'

Components.register('scroll-items', function () {
  function init () {
    var dom = this
    Renders(dom).init()
    Proceses(dom).init()
  }

  return {
    init: init
  }
})
