var history = require('history')

module.exports = (function () {
  var seccionData = {}
  var container = document.body

  function register (ID, html, creator) {
    var s = document.createElement('section')
    s.id = ID
    s.innerHTML = html

    seccionData[ID] = {
      create: creator,
      dom: s,
      instance: null
    }
  }

  function start (ID) {
    var seccion = seccionData[ID]
    var page = document.getElementById(ID)

    if (!seccion) throw new Error('start seccion inexistente: ' + ID)
    if (seccion.instance) return
    if (!page) {
      page = seccion.dom.cloneNode(true)
      page.id = ID
      page = container.appendChild(page)
    }
    seccion.instance = seccion.create(page)
    seccion.instance.init()
  }

  function stop (ID) {
    if (!ID) return
    var seccion = seccionData[ID]
    var page = document.getElementById(ID)

    if (!seccion) throw new Error('stop seccion inexistente: ' + ID)
    if (!seccion.instance) return

    return new Promise(
      function (resolve, reject) {
        Promise.resolve('hola')
        seccionData[page.id].instance.destroy(resolve, reject)
      })
      .then(function () {
        seccionData[page.id].instance = null
        container.removeChild(page)
        return 'hola'
      })
  }

  history
    .onPopState
    .scan(function (previousId, currentId) {
      ((previousId) ? stop(previousId) : Promise.resolve())
        .then(start(currentId))
      return currentId
    }, null)
    .subscribe()

  return {
    register: register,
    start: start,
    stop: stop
  }
}())
