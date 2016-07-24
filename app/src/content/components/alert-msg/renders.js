import St from 'state'
import {createElement, className} from 'utils'

export default function () {
  function init (dom) {
    var closeG = createElement('<svg-icon type="close"></svg-icon>')
    var spanG = createElement('<span></span>')
    dom.appendChild(spanG())
    dom.appendChild(closeG())
    if (dom.textContent !== '') {
      dom.querySelector('span').textContent = dom.textContent
      dom.textContent = ''
    }

    St(dom.id + '.show')
      .on(['N', 'E'])
      .subscribe(function (show) {
        className.bool(show, dom, 'show')
      })
  }

  function destroy () {

  }

  return {init, destroy}
}
