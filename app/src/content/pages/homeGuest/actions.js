import St from 'state'
import Rx from 'rxjs'
import {Request} from 'utils'

export default function () {
  function activatePopupSection (active) {
    return function () {
      St('accionesUsuario.active').value = active
      St('accionesUsuario.show').value = true
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

    St('main_menu').value = {}
    Rx.Observable.fromEvent(
      dom.querySelectorAll('#home_sidebar header .menu>div'),
      'click'
    )
    .map((ev) => ev.currentTarget.getAttribute('data-target'))
    .subscribe(function (target) {
      St('sidebar_main.active').value = target
      St('main_menu.active').value = target
    })

// login
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

    this.showRegistrar = irARegistrarseClicks
      .subscribe(activatePopupSection('registroUsuarios'))

    this.showLogin = Rx.Observable
      .merge(
        ingresarClicks,
        volverDeRegisClicks,
        volverDeOlvClicks,
        sumarTusArbolesClicks)
      .subscribe(activatePopupSection('inicioSesion'))

    this.showOlvido = olvidoClicks.subscribe(
      activatePopupSection('forgotPassword'),
      'click'
    )

    this.onOlvidoSucces = St('forgot.formNotification').on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('sideBar.active').value = 'mainApp'
        }, 4500)
      })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="masInfoBtn"]'), 'click')
        .subscribe(function () {
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

    Rx.Observable.fromEvent(dom.querySelector('[data-id="evento-sidebar-mas"]'), 'click')
    .subscribe(function () {
      if (St('festival_pop.show').value) {
        St('festival_pop.show').value = false
      } else {
        dom.querySelector('.small-pop').click()
      }
    })

    Request('todos_los_arboles')
      .then(function (result) {
        if (result.success) {
          St('all-users').value = result.result
            .map(function (user) {
              var loc = user.loc ? user.loc.split('::') : [0, 0]
              user.loc = {lat: +loc[0], lon: +loc[1]}
              return user
            })
        } else {
          console.error('api error: todos_los_arboles')
        }
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
