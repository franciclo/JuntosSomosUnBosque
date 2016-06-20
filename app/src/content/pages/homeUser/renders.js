import St from 'state'
import { DOM as Dom$ } from 'rx-dom'
import {className} from 'domHelpers'

module.exports = function (dom) {
  function init () {
    var nombre = St('user.name').value
    dom.querySelector('#userBtn span').textContent = nombre
    Dom$.click(dom.querySelector('#userBtn'))
      .subscribe(function () {
        var showing = !!dom.querySelector('aside[data-id="logout"].hide')
        if (showing) {
          className.remove(dom.querySelector('aside[data-id="logout"]'), 'hide')
          className.add(dom.querySelector('aside[data-id="logout"]'), 'show')
        } else {
          className.add(dom.querySelector('aside[data-id="logout"]'), 'hide')
          className.remove(dom.querySelector('aside[data-id="logout"]'), 'show')
        }
      })
  }

  function destroy () {
  }

  return {
    init: init,
    destroy: destroy
  }
}
