import St from 'state'
import { className, createElement } from 'domHelpers'

module.exports = function (dom) {
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
  function createErrorSpans (inputs) {
    console.log('createErrorSpans')
    var createSpan = createElement('<span class="error-msg"></span>')
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].id) throw new Error('form-vali error: input without id', inputs[i])
      dom.querySelector('label[for=' + inputs[i].id + ']').appendChild(createSpan())
    }
  }

  function createNotificationSpan () {
    dom.insertBefore(
      createElement('<span class="notification-msg"></span>')(),
      dom.children[0].tagName === 'H1' ? dom.children[1] : dom.children[0]
    )
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
    window.setTimeout(function () {
      className.remove(notiSpam, 'show')
    }, 5000)
  }

  function init () {
    var id = dom.id
    var inputs = dom.querySelectorAll('[data-label]')
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
      .do(clearErrors)
      .subscribe(printErrors)

    this.onSendSuccess = St(id + '.formNotification')
      .on(['N'])
      .subscribe(printNotification)
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
