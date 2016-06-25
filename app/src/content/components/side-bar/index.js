import './styles.css'
import Proceses from './proceses'
import Renders from './renders'

require('components').register('side-bar', function () {
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
