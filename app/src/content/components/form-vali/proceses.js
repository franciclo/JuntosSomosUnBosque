import St from 'state'
import Validator from 'validator'
import Request from 'request'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function validate (inputs) {
    var ajaxValidations = {}
    var validationMsg = {
      isEmail: 'No es un mail válido',
      isAlpha: 'Solo letras',
      ajaxMailExist: 'El mail no existe',
      ajaxMailDontExist: 'El mail ya esta siendo usado'
    }
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      if (input.hasAttribute('data-rules')) {
        let rules = input.getAttribute('data-rules').split(' ')
        let value = input.value
        for(let y = 0; y < rules.length; y++) {
          let rule = rules[y]
          if (~rule.indexOf('ajax')) {
            ajaxValidations[rule+'_'+i] = value
            continue
          }
          let valid = Validator[rule](input.value)
          if(!valid){
            input.error = validationMsg[rule]
            break
          }
        }
      }
    }

    return new Promise(function (resolve, reject) {
      if(!isEmpty(ajaxValidations)){
        var ajaxValidated = Request('validate', ajaxValidations)
          .send()
          .then(function (results) {
            Object.keys(results).forEach(function(id){
              if(!results[id]){
                let elemId = +id.split('_')[1]
                let rule = id.split('_')[0]
                inputs[elemId].error = validationMsg[rule]
              }
            })
            console.log(results)
            return inputs
          }, function (err) {
            console.warn(err)
          })
        resolve(ajaxValidated)
      } else {
        resolve(inputs)
      }
    }).then(function(inputs){return inputs})
  }

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  function toErrors (inputs) {
    var errors = []
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i].hasOwnProperty('error')) errors[i] = inputs[i].error
    }
    return errors
  }

  function toValues (inputs) {
    var values = {}
    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-label')] = inputs[i].value
    }
    return values
  }

  function valid (bool) {
    return function (inputs) {
      let isValid = toErrors(inputs).length === 0
      return isValid?bool:!bool
    }
  }

  function init () {
    let id = dom.id
    let inputs = dom.querySelectorAll('[data-label]')
    let submitBtn = dom.querySelector('[data-submit]')
    let formSubmits = Dom$.click(submitBtn)
      .map(() => inputs)
      .mergeMap(validate)
      .publish()
    formSubmits.connect()
    
    St(id).value = St(id).value || {}
    St(id + '.errors').value = St(id + '.errors').value || []

    this.onValidationFail = formSubmits
      .filter(valid(false))
      .map(toErrors)
      .subscribe((errors) => {
        St(id + '.errors').value = errors
      })

    this.onValidationSuccess = formSubmits
      .filter(valid(true))
      .map(toValues)
      .subscribe((data) => {
        if(!dom.hasAttribute('direction')) throw new Error('attempt to send form-vali without direction')
        St(id + '.errors').value = []
        Request(dom.getAttribute('direction'), data)
          .send()
          .then(function(info){
            console.log('envio de mail success')
          }, function (err) {
            console.log('envio de mail fail')
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
