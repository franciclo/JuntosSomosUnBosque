var Rx = require('rxjs')

module.exports = (function () {
  var onPopState = new Rx.Subject()

  window.onpopstate = function (stateEvent) {
    onPopState.next(stateEvent.state)
  }

  function go (seccionId) {
    window.history.pushState(seccionId, null, null)
    onPopState.next(seccionId)
  }

  function back () {
    window.history.go(-1)
  }

  return {
    go: go,
    back: back,
    onPopState: onPopState
  }
}())
