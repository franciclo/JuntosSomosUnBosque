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
    var signupFormNotification = St('signupForm.formNotification').value
    var loginFormNotification = St('loginForm.formNotification').value
    var resetVal
    if (signupFormNotification) {
      activatePopupSection('registroUsuarios')()
      resetVal = St('signupForm.formNotification').value
      St('signupForm.formNotification').value = undefined
      St('signupForm.formNotification').value = resetVal
    }

    if (loginFormNotification) {
      activatePopupSection('inicioSesion')()
      resetVal = St('loginForm.formNotification').value
      St('loginForm.formNotification').value = undefined
      St('loginForm.formNotification').value = resetVal
    }

    var registrarseClicks = Dom$.click(
      dom.querySelector('[data-id="registrarse"]')
    )

    var olvidoClicks = Dom$.click(
      dom.querySelector('[data-id="forgotBtn"]')
    )

    var ingresarClicks = Dom$.click(
      dom.querySelector('button[data-id="ingresar-btn"]')
    )

    var volverDeRegisClicks = Dom$.click(
      dom.querySelector('[data-id="volverLoginRegis"]')
    )

    var volverDeOlvClicks = Dom$.click(
      dom.querySelector('[data-id="volverLoginMail"]')
    )

    this.showOlvido = olvidoClicks.subscribe(
      activatePopupSection('forgotPassword')
    )

    this.showRegistrar = registrarseClicks.subscribe(
      activatePopupSection('registroUsuarios')
    )

    this.showLogin = window.Rx.Observable
      .merge(
        ingresarClicks,
        volverDeRegisClicks,
        volverDeOlvClicks)
      .subscribe(activatePopupSection('inicioSesion'))

    this.onOlvidoSucces = St('forgot.formNotification').on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('popUpHome.show').value = false
        }, 4500)
      })
  }

  function destroy (s, f) {
    this.showOlvido.dispose()
    this.showRegistrar.dispose()
    this.showLogin.dispose()
    this.onOlvidoSucces.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
