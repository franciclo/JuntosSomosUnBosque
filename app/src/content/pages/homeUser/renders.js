import St from 'state'
import {className, createElement} from 'utils'

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

    if (St('user.arboles').value && St('user.arboles').value.length) {
      className.remove(dom.querySelector('#tabla_mis_arboles>table'), 'hide')
      className.add(dom.querySelector('#tabla_mis_arboles>span'), 'hide')
      St('mis_arboles_cont.active').value = 'misSuma'
      dom.querySelector('[data-id="suma_arboles_btn_content"] span').textContent = 'Mis árboles'
      renderFilaArbol(dom, St('user.arboles').value)
    } else {
      St('mis_arboles_cont.active').value = 'cartelSuma'
      St('form_suma.formNotification')
        .on('N')
        .filter(function (notification) {
          return notification.success
        })
        .subscribe(function (v) {
          dom.querySelector('[data-id="suma_arboles_btn_content"] span').textContent = 'Mis árboles'
        })
    }

    St('user.arboles')
      .on(['E', 'N'])
      .subscribe(function (arboles) {
        dom.querySelector('#tabla_mis_arboles>table tbody').innerHTML = ''
        renderFilaArbol(dom, arboles)
      })
  }

  function destroy () {
    this.onActiveContent.unsubscribe()
  }

  function renderFilaArbol (dom, arboles) {
    var filaG = createElement('<table><td></td><td></td><td></td></table>')
    var tablaMisArboles = dom.querySelector('#tabla_mis_arboles>table tbody')
    arboles
      .forEach(function (arbol) {
        var fila = filaG().querySelector('tr')
        fila.children[0].textContent = arbol.cantidad
        fila.children[1].textContent = arbol.especie
        fila.children[2].textContent = arbol.tamagno
        tablaMisArboles.appendChild(fila)
      })
  }
  return {init, destroy}
}
