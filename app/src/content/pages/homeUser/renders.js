import St from 'state'
import {className} from 'utils'

export default function () {
  function toggleActiveInfoSection (dom, id) {
    var infoActionButtons = dom.querySelectorAll('#mas_info_side_menu > p')
    for (var i = 0; i < infoActionButtons.length; i++) {
      if (infoActionButtons[i].getAttribute('data-target') === id) {
        className.add(infoActionButtons[i], 'active')
      } else {
        className.remove(infoActionButtons[i], 'active')
      }
    }

    var infoActionContent = dom.querySelectorAll('#mas_info_text > div')
    for (var y = 0; y < infoActionContent.length; y++) {
      if (infoActionContent[y].id === id) {
        className.add(infoActionContent[y], 'active')
      } else {
        className.remove(infoActionContent[y], 'active')
      }
    }
  }

  function init (dom) {
    St('masInfo.content')
      .on(['N', 'E'])
      .subscribe(function (id) {
        toggleActiveInfoSection(dom, id)
      })

    St('festival_pop.show')
      .on('E')
      .subscribe(function (b) {
        className.bool(b, dom.querySelector('#cartel_evento'), 'off')
      })

    St('main_menu.active')
      .on(['N', 'E'])
      .subscribe(function (active) {
        var menuBtns = dom.querySelectorAll('#home_sidebar header .menu>div')
        for (var i = menuBtns.length - 1; i >= 0; i--) {
          var b = menuBtns[i].getAttribute('data-target') === active
          className.bool(b, menuBtns[i], 'active')
        }
      })

    var nombre = St('user.name').value
    dom.querySelector('[data-id="user-btn"] span').textContent = nombre

    St('primeraVez.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('popUpBienvenido.show').value = false
        }, 1000)
      })
    className.remove(document.querySelector('#asignarPlantin'), 'hide')

    St('perfilPopup.show')
      .on(['E', 'N'])
      .filter((show) => show)
      .subscribe(function () {
        dom.querySelector('#perfilForm [data-label="nombre"]').value = St('user.name').value
        dom.querySelector('#perfilForm [data-label="userType"] [value="' + St('user.type').value + '"]').selected = true
      })

    St('perfilForm.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function (data) {
        St('user').value = data.result
        dom.querySelector('[data-id="user-btn"] span').textContent = data.result.name
      })

    St('mis_arboles_cont.active')
      .on(['N', 'E'])
      .subscribe(function (active) {
        dom.querySelector('#mis_arboles_cont').setAttribute('data-active', active)
      })
  }

  function destroy () {
    this.onActiveContent.unsubscribe()
  }

  return {init, destroy}
}
