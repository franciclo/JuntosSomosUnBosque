import St from 'state'
import Validator from 'validator'
import Request from 'request'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function extractData (inputs) {
    var inputsData = []
    for (var i = 0; i < inputs.length; i++)
      inputsData.push({
        i: i,
        name: inputs[i].getAttribute('data-label'),
        value: inputs[i].value,
        rules: inputs[i].getAttribute('data-rules'),
        error: ''
      })
    return inputsData
  }

  function validate (inputsData) {
    var ajaxValidations = {}
    var validationMsg = {
      isEmail: 'No es un mail válido',
      isAlpha: 'Solo letras',
      ajaxMailExist: 'El mail no existe',
      ajaxMailDontExist: 'El mail ya esta siendo usado'
    }
    inputsData.forEach(function(input, inputI){
      if (!input.rules) return
      input.rules
        .split(' ')
        .forEach(function(rule){
          if(input.error !== '') return
          if (~rule.indexOf('ajax')) {
            ajaxValidations[inputI] = JSON.stringify({
              rule:rule,
              value:input.value
            })
            return
          }
          if(!Validator[rule](input.value)){
            input.error = validationMsg[rule]
          }
        })
    })

    return new Promise(function (resolve, reject) {
      if(JSON.stringify(ajaxValidations) !== '{}') {
        var ajaxValidated = Request('validate', ajaxValidations)
          .send()
          .then(function (results) {
            var errorsByI = []
            Object.keys(results)
              .forEach(function(inputI){
                debugger
                if(~errorsByI.indexOf(inputI)) return
                if(!results[inputI]){
                  errorsByI.push(inputI)
                  inputsData[+inputI].error = validationMsg[inputsData[inputI].rule]
                }
              })
            return inputsData
          }, function (err) { console.warn('from-vali ajax err', err) })
        resolve(ajaxValidated)
      } else {
        resolve(inputsData)
      }
    }).then(function(validatedData){return validatedData})
  }

  function toErrors (inputs) {
    return inputs
      .filter(input => input.error !== '' )
      .map(input => {
        delete input.rules
        delete input.name
        delete input.value
        return input
      })
  }

  function toValues (inputs) {
    var values = {}
    inputs.forEach(function(input){
      values[input.name] = input.value
    })
    return values
  }

  function isValid (bool) {
    return function (inputs) {
      let allValid = toErrors(inputs).length === 0
      return allValid?bool:!bool
    }
  }

  function init () {
    let id = dom.id
    let inputs = dom.querySelectorAll('[data-label]')
    let submitBtn = dom.querySelector('[data-submit]')
    let formSubmits = Dom$.click(submitBtn)
      .map(function(){
        return extractData(inputs)
      })
      .mergeMap(validate)
      .publish()
    formSubmits.connect()
    
    St(id).value = St(id).value || {}
    St(id + '.errors').value = St(id + '.errors').value || []

    this.onValidationFail = formSubmits
      .filter(isValid(false))
      .map(toErrors)
      .subscribe((errors) => {
        St(id + '.errors').value = errors
      })

    this.onValidationSuccess = formSubmits
      .filter(isValid(true))
      .map(toValues)
      .subscribe((data) => {
        if(!dom.hasAttribute('direction')) throw new Error('attempt to send form-vali without direction')
        St(id + '.errors').value = []
        Request(dom.getAttribute('direction'), data)
          .send()
          .then(function(info){
            console.log('envio de form-vali success')
          }, function (err) {
            console.log('envio de form-vali fail')
          })
      })
  }

  function destroy () {
    this.onValidationFail.dispose()
    this.onValidationSuccess.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
