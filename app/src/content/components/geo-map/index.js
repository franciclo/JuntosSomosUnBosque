import 'leaflet/dist/leaflet.css'
import './styles.css'
import 'component/svg-icon'
import 'icon/calendar.svg'

import Components from 'components'
import Renders from './renders'

Components.register('geo-map', function () {
  function init () {
    var dom = this
    Renders(dom).init()
  }

  return {
    init: init
  }
})
