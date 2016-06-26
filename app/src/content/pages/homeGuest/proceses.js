import St from 'state'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function activatePopupSection (active) {
    return function () {
      St('sideBar.active').value = active
    }
  }

  function init () {
    // Login
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

    var sumarTusArbolesClicks = Dom$.click(
      dom.querySelector('[data-id="sumarTusArboles"]')
    )
    var proponerUnLugarClicks = Dom$.click(
      dom.querySelector('[data-id="proponerUnLugar"]')
    )

    var registrarseClicks = Dom$.click(
      dom.querySelector('[data-id="registrarse-btn"]')
    )

    var irARegistrarseClicks = Dom$.click(
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

    var volverAHomeClicks = Dom$.click(
      dom.querySelectorAll('.volver')
    )

    var conocerMasClicks = Dom$.click(
      dom.querySelector('[data-id="conocerMas"]')
    )

    this.showOlvido = olvidoClicks.subscribe(
      activatePopupSection('forgotPassword')
    )

    this.showRegistrar = window.Rx.Observable
      .merge(
        irARegistrarseClicks,
        registrarseClicks)
      .subscribe(activatePopupSection('registroUsuarios'))

    this.volverAHome = volverAHomeClicks.subscribe(
      activatePopupSection('mainApp')
    )

    this.showLogin = window.Rx.Observable
      .merge(
        ingresarClicks,
        volverDeRegisClicks,
        volverDeOlvClicks,
        sumarTusArbolesClicks,
        proponerUnLugarClicks)
      .subscribe(activatePopupSection('inicioSesion'))

    this.onOlvidoSucces = St('forgot.formNotification').on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('sideBar.active').value = 'mainApp'
        }, 4500)
      })

    conocerMasClicks.subscribe(function () {
      St('masInformacion.show').value = true
      St('masInformacion.active').value = 'masInfo'
    })

    // Home
    St('mainApp').value = {}
    St('masInfo').value = {}

    var sideBarContentMenuClicks = Dom$.click(
      dom.querySelectorAll('[data-id="actionMenu"] button')
    )

    sideBarContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('mainApp.content').value = active
      })

    var infoContentMenuClicks = Dom$.click(
      dom.querySelectorAll('#mas_info_side_menu > p')
    )

    infoContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('masInfo.content').value = active
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
