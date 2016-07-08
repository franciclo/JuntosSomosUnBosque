import St from 'state'
import Rx from 'rxjs'

export default function () {
  function activatePopupSection (active) {
    return function () {
      St('sideBar.active').value = active
    }
  }

  function init (dom) {
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

    var sumarTusArbolesClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="sumarTusArboles"]'),
      'click'
    )
    var proponerUnLugarClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="proponerUnLugar"]'),
      'click'
    )

    var registrarseClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="registrarse-btn"]'),
      'click'
    )

    var irARegistrarseClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="registrarse"]'),
      'click'
    )

    var olvidoClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="forgotBtn"]'),
      'click'
    )

    var ingresarClicks = Rx.Observable.fromEvent(
      dom.querySelector('button[data-id="ingresar-btn"]'),
      'click'
    )

    var volverDeRegisClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="volverLoginRegis"]'),
      'click'
    )

    var volverDeOlvClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="volverLoginMail"]'),
      'click'
    )

    var volverAHomeClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('.volver'),
      'click'
    )

    var conocerMasClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="conocerMas"]'),
      'click'
    )

    this.showOlvido = olvidoClicks.subscribe(
      activatePopupSection('forgotPassword'),
      'click'
    )

    this.showRegistrar = Rx.Observable
      .merge(
        irARegistrarseClicks,
        registrarseClicks)
      .subscribe(activatePopupSection('registroUsuarios'))

    this.volverAHome = volverAHomeClicks.subscribe(
      activatePopupSection('mainApp')
    )

    this.showLogin = Rx.Observable
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

    var sideBarContentMenuClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('[data-id="actionMenu"] button'),
      'click'
    )

    sideBarContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('mainApp.content').value = active
      })

    var infoContentMenuClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('#mas_info_side_menu > p'),
      'click'
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

  return {init, destroy}
}
