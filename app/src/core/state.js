import ObjectPath from 'object-path'
import {diff} from 'deep-diff'
import Rx from 'rxjs'
import 'rx-dom'

module.exports = (function () {
  var stateData = {}
  var state$ = new Rx.Subject()
  var state$Diffs = state$
    .scan(function (acc, chg) {
      acc.set(chg.path, chg.value)
      return ObjectPath(acc.get())
    }, ObjectPath({}))
    .subscribeOn(Rx.Scheduler.requestAnimationFrame)
    .map(function (stateChg) {
      stateChg = stateChg.get()
      var diffs = diff(stateData, stateChg)
      stateData = stateChg
      return diffs
    })
    .filter(function (diffs) {
      return diffs
    })
    .mergeMap(function (diffs) {
      return Rx.Observable.from(diffs)
    })
    .publish()

  state$Diffs.connect()

  function query (path) {
    return {
      on: function (kind) {
        kind = typeof kind === 'string'
          ? [kind] : kind
        return state$Diffs
          .filter(
            function (d) {
              console.log(d)
              console.log(stateData)
              return d.path.join('.') === path &&
                ~kind.indexOf(d.kind)
            })
          .filter(function (d) {
            return !~['D', 'A'].indexOf(d.kind)
          })
          .map(function (d) {
            return d.rhs
          })
      },
      get value () { return ObjectPath(stateData).get(path) },
      set value (value) { state$.next({path: path, value: value}) }
    }
  }

  return query
}())
