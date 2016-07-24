import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id + '.chg').value = false
    this.chgCliks = Rx.Observable.fromEvent(dom.querySelector('input'), 'change')
      .subscribe(function () {
        St(id + '.chg').value = true
      })
    St(dom.querySelector('form-vali').id + '.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        St(id + '.chg').value = false
      })
  }

  function destroy () {
    this.chgCliks.unsubscribe()
  }

  return {init, destroy}
}
