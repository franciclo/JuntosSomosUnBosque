import St from 'state'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function activatePopupSection (active) {
    return function () {
      St('popUpHome.show').value = true
      St('popUpHome.active').value = active
    }
  }

  function init () {
    var tieneNombre = St('user.name').value !== 'Usuario'
    if (!tieneNombre) {
      St('popUpBienvenido.show').value = true
      St('popUpBienvenido.active').value = 'comoTeLlamas'
    }
    var misArbolesClicks = Dom$.click(
      dom.querySelector('[data-id="mis-arboles-btn"]')
    )

    this.showOlvido = misArbolesClicks.subscribe(
      activatePopupSection('agregarArboles')
    )

    this.onUsuarioPresentado = St('mellamo.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('popUpBienvenido.show').value = false
        }, 4000)
      })

    Dom$.click(dom.querySelector('[data-id="logout"]'))
      .subscribe(function () {
        window.location = '/logout'
      })
  }

  function destroy (s, f) {
    this.showOlvido.dispose()
    this.onUsuarioPresentado.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
