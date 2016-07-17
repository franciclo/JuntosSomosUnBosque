import St from 'state'
import { className, createElement } from 'utils'

export default function () {
  var createErrSpan = createElement('<span class="error-msg"></span>')
  var createNotiSpan = createElement('<span class="notification-msg"></span>')

  function createErrorSpans (dom, inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'hidden') continue
      if (!inputs[i].id) throw new Error('form-vali error: input without id', inputs[i])
      dom.querySelector('label[for=' + inputs[i].id + ']').appendChild(createErrSpan())
    }
  }

  function createNotificationSpan (dom) {
    dom.insertBefore(
      createNotiSpan(),
      dom.children[0].tagName === 'H1' ? dom.children[1] : dom.children[0]
    )
  }

  function clearErrors (dom, inputs) {
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
      if (inputs[i].type === 'select-one') {
        inputs[i].value = 'default'
        continue
      }
      inputs[i].value = ''
    }
  }

  function printErrors (dom, e) {
    e.errors.forEach(function (error) {
      var spanErr = dom.querySelector('label[for=' + e.inputs[error.i].id + '] .error-msg')
      spanErr.textContent = error.error
      className.add(e.inputs[error.i], 'has-error')
    })
  }

  function printNotification (dom, notification) {
    var notiSpam = dom.querySelector('.notification-msg')
    className.add(notiSpam, notification.success ? 'success' : 'error')
    className.add(notiSpam, 'show')
    notiSpam.textContent = notification.text
    if (notification.success) {
      window.setTimeout(function () {
        className.remove(notiSpam, 'show')
      }, 1000)
    } else {
      window.setTimeout(function () {
        className.remove(notiSpam, 'show')
      }, 1000)
    }
  }

  function init (dom) {
    let id = dom.id
    let inputs = dom.querySelectorAll('[data-label]')
    let submitBtn = dom.querySelector('[data-submit]')

    submitBtn.setAttribute('label-pasive', submitBtn.textContent)

    createErrorSpans(dom, inputs)
    createNotificationSpan(dom)

    this.onErrorChange = St(id + '.errors')
      .on('N')
      .map(function (errors) {
        return {
          errors: errors,
          inputs: inputs
        }
      })
      .subscribe(function (e) {
        clearErrors(dom, e.inputs)
        printErrors(dom, e)
      })

    this.onSendSuccess = St(id + '.formNotification')
      .on(['N'])
      .do(function (notifications) {
        printNotification(dom, notifications)
      })
      .map(function (s) {
        return inputs
      })
      .subscribe(function (inputs) {
        clearErrors(dom, inputs)
        if (dom.hasAttribute('clear-values')) clearValues(inputs)
      })

    // this.onLoading = St(id + '.loading')
    //   .on(['N', 'E'])
    //   .subscribe(function (bool) {
    //     submitBtn.textContent = submitBtn
    //       .getAttribute(bool ? 'label-active' : 'label-pasive')
    //   })
  }

  function destroy () {
    this.onErrorChange.dispose()
  }

  return {init, destroy}
}
