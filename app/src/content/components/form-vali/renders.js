import St from 'state'
import {className, createElement} from 'domHelpers'

module.exports = function (dom) {
  function initErrors () {
    console.log('initErrors')
    var createSpan = createElement('<span></span>')
    var span
    var inputElements = dom.querySelectorAll('[data-rules]')
    for (var i = 0; i < inputElements.length; i++) {
      if (!inputElements[i].id) console.warn('El input no tiene id.', inputElements[i])
      span = createSpan()
      span.className = 'error-msg'
      document.querySelector('label[for=' + inputElements[i].id + ']').appendChild(span)
    }
  }

  function printErrors (error) {
    var inputElements = dom.querySelectorAll('[data-label]')
    debugger
    var spanErr = document.querySelector('label[for=' + inputElements[error.i].id + '] .error-msg')
    spanErr.textContent = error.value

    for (var i = 0; i < inputElements.length; i++) {
      if (i !== error.i) {
        className.add(inputElements[i], 'has-error')
      } else {
        className.remove(inputElements[i], 'has-error')
      }
    }
  }

  function init () {
    var id = dom.id
    this.onCreated = St(id + '.errors')
      .on('N')
      .subscribe(initErrors)
      
    this.onErrorChange = St(id + '.errors')
      .on('A')
      .subscribe(printErrors)
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
