import ObjectPath from 'object-path'
import ObjectPathImmutable from 'object-path-immutable'
import {diff} from 'deep-diff'
import Rx from 'rxjs'
import 'rx-dom'

module.exports = (function () {
  var stateData = {}
  var seed = {state:ObjectPath({}), diff:[]}
  var state$ = new Rx.Subject()
  var state$Diffs = state$
    .scan(function (acc, chg) {
      var oldState = acc.state.get()
      var newState = ObjectPathImmutable
        .set(oldState, chg.path, chg.value)
      acc.state = ObjectPath(newState)
      acc.diff = diff(oldState, newState)
      return acc
    }, seed)
    .do(function(stateDiff){
      stateData = ObjectPathImmutable.set(stateDiff.state.get())
      if(stateDiff.diff)
        console.dir(stateDiff.diff)
    })
    .map(function (stateDiff) {
      return stateDiff.diff
    })
    .filter(function(diffs){
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
          .filter(function (d) {
            return d.path.join('.') === path &&
              ~kind.indexOf(d.kind)
          })
          .map(function (d) {
            switch(d.kind){
              case 'A':
                return {i:d.index, value:d.item.rhs}
              case 'D':
                return undefined
              default:
                return d.rhs
            }
          })
      },
      get value () { return ObjectPath(stateData).get(path) },
      set value (value) { state$.next({path: path, value: value}) }
    }
  }
  window.$tate = query
  return query
}())
