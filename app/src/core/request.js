var server = 'http://localhost:3000'
module.exports = function (cmd, params) {
  function serializeUrl () {
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

  function send () {
    return new Promise(function (resolve, reject) {
      var xhr = new window.XMLHttpRequest()
      var url = serializeUrl()
      console.log('request to', url)
      xhr.open('GET', url, true)

      xhr.onload = function () {
        if (xhr.status !== 200) {
          resolve({success: false, message: 'Ajax no ok - ' + xhr.status})
          return
        }

        try {
          var response = JSON.parse(xhr.responseText)
        } catch (e) {
          resolve({success: false, message: 'JSON parser error', data: xhr.responseText})
          return
        }

        resolve(response)
      }

      xhr.onerror = function (err) {
        resolve({success: false, message: 'ajax error - ' + JSON.stringify(err)})
      }

      xhr.send()
    })
  }

  return {
    send: send,
    serializeUrl: serializeUrl
  }
}
