import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}
    St(id + '.show').value = false
    this.popupCliks = Rx.Observable.fromEvent(dom.parentNode.parentNode.parentNode.parentNode.querySelector('.leaflet-popup:not(.expanded)'), 'click')
      .subscribe(function () {
        St(id + '.show').value = true
      })
    this.popupCliks = Rx.Observable
      .fromEvent(dom.querySelector('svg-icon[type="close"]'), 'click')
      .subscribe(function (e) {
        e.stopPropagation()
        St(id + '.show').value = false
      })
    this.popupCliks = Rx.Observable
      .fromEvent(dom.querySelector('[data-id="verCronogramaBtn"]'), 'click')
      .subscribe(function () {
        St('eventoPopContent.active').value = 'cronoSlide'
      })
    this.popupCliks = Rx.Observable
      .fromEvent(dom.querySelector('[data-id="volverAIntro"]'), 'click')
      .subscribe(function () {
        St('eventoPopContent.active').value = 'introSlide'
      })
  }

  function destroy () {
    this.popupCliks.unsubscribe()
  }

  return {init, destroy}
}
