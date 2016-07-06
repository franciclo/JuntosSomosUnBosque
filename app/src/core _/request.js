var server = 'http://localhost:3000'
module.exports = function (cmd, params) {
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
