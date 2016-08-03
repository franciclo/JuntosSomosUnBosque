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
    // className.remove(document.querySelector('#asignarPlantin'), 'hide')

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
    className.add(dom.querySelector('#form_suma-notification'), 'hide')
    if (St('user.arboles').value && St('user.arboles').value.length) {
      St('mis_arboles_cont.active').value = 'misSuma'
      className.remove(dom.querySelector('#lista_mis_arboles_cabecera'), 'hide')
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
      .on(['A'])
      .subscribe(function (arboles) {
        arboles = typeof arboles === 'array' ? arboles : [arboles] 
        className.remove(dom.querySelector('#lista_mis_arboles_cabecera'), 'hide')
        renderFilaArbol(dom, arboles)
      })
    St('arbolesRed')
      .on(['N'])
      .subscribe(function (arboles) {
        renderFilaArbolesRed(dom, arboles)
        var arbolesCantidad = []
        for (var arbol in arboles) {
          arbolesCantidad.push(arboles[arbol].cantidad)
        }
        var cantidadTotal = arbolesCantidad
          .reduce((a, b) => a + b, 0)
        dom.querySelector('#home_sidebar .logo svg-icon .count').textContent = cantidadTotal
      })
  }

  function destroy () {
    this.onActiveContent.unsubscribe()
  }

  function renderFilaArbol (dom, arboles) {
    var wrppG = createElement('<arbol-fila></arbol-fila>')
    var tablaMisArboles = dom.querySelector('#lista_mis_arboles')
    var frg = document.createDocumentFragment()
    arboles
      .forEach(function (arbol) {
        var wrpp = wrppG()
        wrpp.setAttribute('data-especie', arbol.especie)
        wrpp.setAttribute('data-tamagno', arbol.tamagno)
        wrpp.setAttribute('data-cantidad', arbol.cantidad)
        frg.appendChild(wrpp)
      })
    tablaMisArboles.appendChild(frg)
  }

  function renderFilaArbolesRed (dom, arboles) {
    var wrppG = createElement('<div class="fila-arbol"><span></span><span></span></div>')
    var tablaArboles = dom.querySelector('#lista_arboles_red')
    var frg = document.createDocumentFragment()
    for (var arbol in arboles) {
      var wrpp = wrppG()
      wrpp.children[0].textContent = arboles[arbol].label
      wrpp.children[1].textContent = arboles[arbol].cantidad
      frg.appendChild(wrpp)
    }
    tablaArboles.appendChild(frg)
  }

  return {init, destroy}
}
