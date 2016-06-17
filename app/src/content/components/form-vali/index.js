import './styles.css'
import Components from 'components'
import Proceses from './proceses'
import Renders from './renders'

Components.register('form-vali', function () {
  function init () {
    Renders(this).init()
    Proceses(this).init()
  }

  function destroy () {
    Renders(this).destroy()
    Proceses(this).destroy()
  }

  return {
    init: init,
    destroy: destroy
  }
})
