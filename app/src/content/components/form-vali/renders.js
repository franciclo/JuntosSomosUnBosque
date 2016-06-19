import St from 'state'
import { className, createElement } from 'domHelpers'

module.exports = function (dom) {
  var createErrSpan = createElement('<span class="error-msg"></span>')
  var createNotiSpan = createElement('<span class="notification-msg"></span>')

  function createErrorSpans (inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'hidden') continue
      if (!inputs[i].id) throw new Error('form-vali error: input without id', inputs[i])
      dom.querySelector('label[for=' + inputs[i].id + ']').appendChild(createErrSpan())
    }
  }

  function createNotificationSpan () {
    dom.insertBefore(
      createNotiSpan(),
      dom.children[0].tagName === 'H1' ? dom.children[1] : dom.children[0]
    )
  }

  function clearErrors (inputs) {
    var spanErrs = dom.querySelectorAll('label .error-msg')
    for (var i = 0; i < inputs.length; i++) {
      className.remove(inputs[i], 'has-error')
    }
    for (var y = 0; y < spanErrs.length; y++) {
      spanErrs[y].textContent = ''
    }
  }

  function clearValues (inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

  function printErrors (e) {
    e.errors.forEach(function (error) {
      var spanErr = dom.querySelector('label[for=' + e.inputs[error.i].id + '] .error-msg')
      spanErr.textContent = error.error
      className.add(e.inputs[error.i], 'has-error')
    })
  }

  function printNotification (notification) {
    var notiSpam = dom.querySelector('.notification-msg')
    className.add(notiSpam, notification.success ? 'success' : 'error')
    className.add(notiSpam, 'show')
    notiSpam.textContent = notification.text
    if (notification.success) {
      window.setTimeout(function () {
        className.remove(notiSpam, 'show')
      }, 4000)
    } else {
      window.setTimeout(function () {
        className.remove(notiSpam, 'show')
      }, 8000)
    }
  }

  function init () {
    let id = dom.id
    let inputs = dom.querySelectorAll('[data-label]')
    let submitBtn = dom.querySelector('[data-submit]')

    submitBtn.setAttribute('label-pasive', submitBtn.textContent)

    this.onCreated = St(id)
      .on('N')
      .map(function (s) {
        return inputs
      })
      .subscribe(function (inputs) {
        createErrorSpans(inputs)
        createNotificationSpan()
      })

    this.onErrorChange = St(id + '.errors')
      .on('N')
      .map(function (errors) {
        return {
          errors: errors,
          inputs: inputs
        }
      })
      .subscribe(function (e) {
        clearErrors(e.inputs)
        printErrors(e)
      })

    this.onSendSuccess = St(id + '.formNotification')
      .on(['N'])
      .do(printNotification)
      .map(function (s) {
        return inputs
      })
      .subscribe(function (inputs) {
        clearErrors(inputs)
        clearValues(inputs)
      })

    this.onLoading = St(id + '.loading')
      .on(['N', 'E'])
      .subscribe(function (bool) {
        submitBtn.textContent = submitBtn
          .getAttribute(bool ? 'label-active' : 'label-pasive')
      })
  }

  function destroy () {
    this.onCreated.dispose()
    this.onErrorChange.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
