module.exports.createElement = function (htmlStr) {
  var div = document.createElement('div')
  div.innerHTML = htmlStr
  return function () {
    return div.children[0].cloneNode(true)
  }
}

module.exports.className = (function () {
  function has (el, cl) {
    if (!el) throw new Error('className of null')
    return el.getAttribute('class') && ~el.getAttribute('class').indexOf(cl)
  }
  function remove (el, cl) {
    if (!el) throw new Error('className of null')
    if (!has(el, cl)) return
    el.setAttribute('class', el.getAttribute('class').replace(cl, ''))
  }
  function add (el, cl) {
    if (!el) throw new Error('className of null')
    if (has(el, cl)) return
    if (el.getAttribute('class')) {
      el.setAttribute('class', el.getAttribute('class').replace(/\s\s+/g, ' ') + ' ' + cl)
    } else {
      el.setAttribute('class', cl)
    }
  }
  function bool (b, el, cl) {
    if (!el) throw new Error('className of null')
    if (b) add(el, cl)
    else remove(el, cl)
  }

  return {remove, add, bool}
}())
