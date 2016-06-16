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
    var registrarseClicks = Dom$
      .click(dom.querySelector('[data-id="registrarse"]'))

    var olvidoClicks = Dom$
      .click(dom.querySelector('[data-id="forgotBtn"]'))

    var ingresarClicks = Dom$
      .click(dom.querySelector('button[data-id="ingresar-btn"]'))

    var volverDeRegisClicks = Dom$
      .click(dom.querySelector('[data-id="volverLoginRegis"]'))

    var volverDeOlvClicks = Dom$
      .click(dom.querySelector('[data-id="volverLoginMail"]'))

    this.showOlvido = olvidoClicks
      .subscribe(activatePopupSection('forgotPassword'))

    this.showRegistrar = registrarseClicks
      .subscribe(activatePopupSection('registroUsuarios'))

    this.showLogin = window.Rx.Observable
      .merge(
        ingresarClicks,
        volverDeRegisClicks,
        volverDeOlvClicks)
      .subscribe(activatePopupSection('inicioSesion'))
  }

  function destroy (s, f) {
    this.showOlvido.dispose()
    this.showRegistrar.dispose()
    this.showLogin.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
