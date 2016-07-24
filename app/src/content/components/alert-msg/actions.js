import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id + '.show').value = false
    this.closeCliks = Rx.Observable.fromEvent(dom.querySelector('svg-icon[type="close"]'), 'click')
      .subscribe(function () {
        St(id + '.show').value = false
      })
  }

  function destroy () {
    this.closeCliks.unsubscribe()
  }

  return {init, destroy}
}
