import St from 'state'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function init () {
    var id = dom.id
    St(id).value = {}

    let popUpClicks = Dom$
      .click(dom)
      .filter((e) => e.target.tagName === 'POP-UP')
      .filter(() => dom.getAttribute('closable') !== 'false')

    let closeIconClicks = Dom$.click(dom.querySelector('svg-icon[type="close"]'))

    this.closeCliks = window.Rx.Observable
      .merge(popUpClicks, closeIconClicks)
      .subscribe(function () {
        St(id + '.show').value = false
      })
  }

  function destroy () {
    this.closeCliks.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
