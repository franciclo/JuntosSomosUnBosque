import St from 'state'
// import Rx from 'rxjs'
import RxDom from 'rx-dom'

module.exports = function (dom) {
  function init () {
    var id = dom.id
    St(id + '.show').value = false
    let popUpClicks = RxDom.DOM.click(dom)
    let closeIconClicks = RxDom.DOM.click(dom.querySelector('svg-icon[type="close"]'))
    this.closeCliks = RxDom.Observable
      .merge(popUpClicks, closeIconClicks)
      .subscribe(function (v) {
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
