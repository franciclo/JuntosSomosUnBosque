import './styles.css'
import Components from 'components'
import Renders from './renders'

Components.register('svg-icon', function (dom) {
  function init () {
    Renders(this).init()
  }

  return {
    init: init
  }
})
