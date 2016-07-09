import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}
    St(id + '.show').value = false
    this.popupCliks = Rx.Observable.fromEvent(dom.querySelector('.small-pop'), 'click')
      .subscribe(function () {
        St(id + '.show').value = true
      })
    this.popupCliks = Rx.Observable
      .fromEvent(dom.querySelector('svg-icon[type="close"]'), 'click')
      .subscribe(function () {
        St(id + '.show').value = false
      })
  }

  function destroy () {
    this.popupCliks.unsubscribe()
  }

  return {init, destroy}
}
