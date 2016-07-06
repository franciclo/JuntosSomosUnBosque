import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}

    let popUpClicks = Rx.Observable.fromEvent(dom, 'click')
      .filter((e) => e.target.tagName === 'POP-UP')
      .filter(() => dom.getAttribute('closable') !== 'false')

    let closeIconClicks = Rx.Observable.fromEvent(dom.querySelector('svg-icon[type="close"]'), 'click')

    this.closeCliks = Rx.Observable
      .merge(popUpClicks, closeIconClicks)
      .subscribe(function () {
        St(id + '.show').value = false
      })
  }

  function destroy () {
    this.closeCliks.dispose()
  }

  return {init, destroy}
}
