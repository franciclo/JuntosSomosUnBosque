var State = require('state')

module.exports = function (dom) {
  function activatePopupSection (active) {
    return function () {
      State.query('popUpHome.show').value = true
      State.query('popUpHome.active').value = active
      switch (active) {
        case 'inicioSesion':
          State.query('popUpHome.width').value = '350px'
          break
        default:
          State.query('popUpHome.width').value = '350px'
      }
    }
  }

  function hidePopup () {
    State.query('popUpHome.show').value = false
  }

  function init () {
    State.query('popUpHome.active').value = 'landing'

    dom.querySelector('[data-id="explorar"]')
      .addEventListener('click', hidePopup)
    dom.querySelector('[data-id="iniciarSesion"]')
      .addEventListener('click', activatePopupSection('inicioSesion'))
    dom.querySelector('[data-id="registrarse"]')
      .addEventListener('click', activatePopupSection('registroUsuarios'))
    dom.querySelector('[data-id="forgotBtn"]')
      .addEventListener('click', activatePopupSection('forgotPassword'))
    dom.querySelector('button[data-id="ingresar-btn"]')
      .addEventListener('click', activatePopupSection('inicioSesion'))
  }

  function destroy (s, f) {
    dom.querySelector('[data-id="explorar"]')
      .removeEventListener('click', hidePopup)
    dom.querySelector('[data-id="iniciarSesion"]')
      .removeEventListener('click', activatePopupSection('inicioSesion'))
    dom.querySelector('[data-id="registrarse"]')
      .removeEventListener('click', activatePopupSection('registroUsuarios'))
    dom.querySelector('[data-id="forgotBtn"]')
      .removeEventListener('click', activatePopupSection('forgot'))
    dom.querySelector('button[data-id="ingresar-btn"]')
      .removeEventListener('click', activatePopupSection('inicioSesion'))

  }

  return {
    init: init,
    destroy: destroy
  }
}
