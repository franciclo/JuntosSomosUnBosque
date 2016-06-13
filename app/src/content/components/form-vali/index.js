import './styles.css'
import Components from 'components'
import St from 'state'
import Proceses from './proceses'
import Renders from './renders'

Components.register('form-vali', function () {
  function init () {
    var id = this.id
    St(id).value = St(id).value || {}
    St(id + '.errors').value = St(id + '.errors').value || []
    Proceses(this).init()
    Renders(this).init()
  }

  function destroy () {
    Proceses(this).destroy()
    Renders(this).destroy()
  }

  return {
    init: init,
    destroy: destroy
  }
})
