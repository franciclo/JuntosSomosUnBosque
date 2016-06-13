import St from 'state'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function init () {
    var id = dom.id
    St(id).value = {}
    St(id + '.show').value = false
    St(id + '.active').value = ''

    let popUpClicks = Dom$.click(dom.querySelector('pop-up'))
    let closeIconClicks = Dom$.click(dom.querySelector('svg-icon[type="close"]'))
    this.closeCliks = Rx.Observable
      .merge(popUpClicks, closeIconClicks)
      .subscribe(function(){
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
