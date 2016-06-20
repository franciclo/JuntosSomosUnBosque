var history = require('history')

module.exports = (function () {
  var pageData = {}
  var container = document.body

  function register (ID, html, creator) {
    var s = document.createElement('section')
    s.id = ID
    s.innerHTML = html

    pageData[ID] = {
      create: creator,
      dom: s,
      instance: null
    }
  }

  function start (ID) {
    var page = pageData[ID]
    var pageDom = document.getElementById(ID)

    if (!page) throw new Error('start page inexistente: ' + ID)
    if (page.instance) return
    if (!pageDom) {
      pageDom = page.dom.cloneNode(true)
      pageDom.id = ID
      pageDom = container.appendChild(pageDom)
    }
    page.instance = page.create(pageDom)
    page.instance.init()
  }

  function stop (ID) {
    if (!ID) return
    var page = pageData[ID]
    var pageDom = document.getElementById(ID)

    if (!page) throw new Error('stop page inexistente: ' + ID)
    if (!page.instance) return

    return new Promise(
      function (resolve, reject) {
        Promise.resolve('hola')
        pageData[pageDom.id].instance.destroy(resolve, reject)
      })
      .then(function () {
        pageData[pageDom.id].instance = null
        container.removeChild(pageDom)
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
