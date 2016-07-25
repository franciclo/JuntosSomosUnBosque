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

module.exports.Request = function (cmd, params) {
  var server = window.location.origin
  function getUrl () {
    var paramStr = ''
    var cmdStr = '/' + cmd

    if (params) {
      cmdStr = cmdStr + '?'
      for (var nom in params) {
        paramStr += nom + '=' + params[nom] + '&'
      }
      paramStr = paramStr.replace(/\s/g, '+').substring(0, paramStr.length - 1)
    }
    return server + cmdStr + paramStr
  }

  return new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest()
    var url = getUrl()
    console.log('request to', url)
    xhr.open('GET', url, true)

    xhr.onload = function () {
      if (xhr.status !== 200) {
        resolve({success: false, text: 'Error interno', result: xhr.status})
        return
      }

      try {
        var response = JSON.parse(xhr.responseText)
      } catch (e) {
        resolve({success: false, text: 'Error interno', result: xhr.responseText})
        return
      }

      resolve(response)
    }

    xhr.onerror = function (err) {
      resolve({success: false, text: 'Error interno', result: JSON.stringify(err)})
    }

    xhr.send()
  })
}
