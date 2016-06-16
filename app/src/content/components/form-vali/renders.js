import St from 'state'
import { className, createElement } from 'domHelpers'

module.exports = function (dom) {
  function init () {
    var id = dom.id
    var inputs = dom.querySelectorAll('[data-label]')
    var createSpan = createElement('<span class="error-msg"></span>')
    this.onCreated = St(id)
      .on('N')
      .map(function (s) {
        return inputs
      })
      .subscribe(function () {
        for (var i = 0; i < inputs.length; i++) {
          if (!inputs[i].id) throw new Error('form-vali error: input without id', inputs[i])
          dom.querySelector('label[for=' + inputs[i].id + ']').appendChild(createSpan())
        }
      })

    this.onErrorChange = St(id + '.errors')
      .on('N')
      .do(function () {
        var spanErrs = dom.querySelectorAll('label .error-msg')
        for (var i = 0; i < inputs.length; i++) {
          className['remove'](inputs[i], 'has-error')
        }
        for (var y = 0; y < spanErrs.length; y++) {
          spanErrs[y].textContent = ''
        }
      })
      .subscribe(function (errors) {
        errors.forEach(function (error) {
          var spanErr = dom.querySelector('label[for=' + inputs[error.i].id + '] .error-msg')
          spanErr.textContent = error.error
          className['add'](inputs[error.i], 'has-error')
        })
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
