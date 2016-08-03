import St from 'state'
import { createElement, className } from 'utils'

export default function () {
  function init (dom) {
    var wrppG = createElement('<form-vali direction="edit_arbol"><span></span><input type="number" data-label="cantidad" id="cantidad" min="0" /><input type="hidden" data-label="tamagno" id="tamagno" /><input type="hidden" data-label="especie" id="especie" /><button data-submit title="Guardar"><svg-icon type="guardar"></svg-icon></button></form-vali>')

    var especie = dom.getAttribute('data-especie')
    var tamagno = dom.getAttribute('data-tamagno')
    var cantidad = dom.getAttribute('data-cantidad')

    var wrpp = wrppG()
    dom.id = especie + '-' + tamagno + '-fila'
    wrpp.id = especie + '-' + tamagno + '-form'
    wrpp.querySelector('span').textContent = especie + ' ' + tamagno
    wrpp.querySelector('[data-label="especie"]').value = especie
    wrpp.querySelector('[data-label="tamagno"]').value = tamagno
    wrpp.querySelector('[data-label="cantidad"]').value = cantidad
    dom.appendChild(wrpp)

    St(dom.id + '.chg')
      .on(['N', 'E'])
      .subscribe(function (b) {
        className.bool(b, dom, 'chg')
      })

    var arbolI
    for (var i = dom.parentNode.children.length - 1; i >= 0; i--) {
      if (dom.parentNode.children[i] === dom) arbolI = i - 1
    }
    var estearbol = 'user.arboles.' + arbolI + '.cantidad'
    St('user.arboles.' + arbolI + '.cantidad')
      .on(['E'])
      .subscribe(function (cantidad) {
        dom.querySelector('[data-label="cantidad"]').value = cantidad
        className.add(dom, 'flash')
        window.setTimeout(function () {
          className.remove(dom, 'flash')
        }, 1000)
      })

    St(dom.id + '.chg')
      .on(['N', 'E'])
      .subscribe(function (b) {
        className.bool(b, dom, 'chg')
      })

    St(especie + '-' + tamagno + '-form.formNotification')
      .on(['N'])
      .filter((notification) => notification.success)
      .subscribe((notification) => {
        St('user.arboles.' + arbolI).value = notification.result
      })
  }

  function destroy () {
  }

  return {init, destroy}
}
