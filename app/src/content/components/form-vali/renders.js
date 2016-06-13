import St from 'state'
import {className, createElement} from 'domHelpers'

module.exports = function (dom) {
  function initErrors () {
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

  function printErrors (errors) {
    var inputElements = dom.querySelectorAll('[data-label]')
    
    for (var i = 0; i < inputElements.length; i++) {
      if (!!~Object.keys(errors).indexOf(i+"")) {
        var spanErr = document.querySelector('label[for=' + inputElements[i].id + '] .error-msg')
        className.add(inputElements[i], 'has-error')
        spanErr.textContent = errors[i]
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
      .on('E')
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
