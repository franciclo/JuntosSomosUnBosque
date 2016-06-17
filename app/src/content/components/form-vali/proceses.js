import St from 'state'
import isEmail from 'validator/lib/isEmail'
import Request from 'request'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function extractData (inputs) {
    var inputsData = []
    for (var i = 0; i < inputs.length; i++) {
      inputsData.push({
        i: i,
        name: inputs[i].getAttribute('data-label'),
        value: inputs[i].value,
        rules: inputs[i].getAttribute('data-rules'),
        error: ''
      })
    }
    return inputsData
  }

  function validate (inputsData) {
    var Validator = {
      isEmail: isEmail,
      required: function (v) { return v.length !== 0 },
      equalTo: function (v, _v) { return v === _v }
    }
    var ajaxValidations = {}
    var validationMsg = {
      required: 'Obligatorio',
      isEmail: 'No es un mail válido',
      equalTo: 'No coincide',
      ajaxMailExist: 'El mail no existe',
      ajaxMailDontExist: 'El mail ya esta siendo usado'
    }
    inputsData.forEach(function (input, inputI) {
      if (!input.rules) return
      input.rules
        .split(' ')
        .forEach(function (rule) {
          if (input.error !== '') return
          if (~rule.indexOf('ajax')) {
            ajaxValidations[inputI] = JSON.stringify({
              rule: rule,
              value: input.value
            })
            return
          }
          if (~rule.indexOf('equalTo')) {
            var equalToVal = dom.querySelector('[data-label="' + rule.split('-')[1] + '"]').value
            if (!Validator[rule.split('-')[0]](input.value, equalToVal)) {
              input.error = validationMsg[rule.split('-')[0]]
            }
            return
          }
          if (!Validator[rule](input.value)) {
            input.error = validationMsg[rule]
          }
        })
    })

    return new Promise(function (resolve, reject) {
      if (JSON.stringify(ajaxValidations) !== '{}') {
        var ajaxValidated = Request('validate', ajaxValidations)
          .send()
          .then(function (results) {
            var errorsByI = []
            Object.keys(results)
              .forEach(function (inputI) {
                if (~errorsByI.indexOf(inputI)) return
                if (!results[inputI].valid) {
                  errorsByI.push(inputI)
                  inputsData[+inputI].error = validationMsg[results[inputI].rule]
                }
              })
            return inputsData
          }, function (err) { console.warn('from-vali ajax err', err) })
        resolve(ajaxValidated)
      } else {
        resolve(inputsData)
      }
    }).then(validatedData => validatedData)
  }

  function toErrors (inputs) {
    return inputs
      .filter(input => input.error !== '')
      .map(input => {
        return {
          i: input.i,
          error: input.error
        }
      })
  }

  function toValues (inputs) {
    var values = {}
    inputs.forEach(function (input) {
      values[input.name] = input.value
    })
    return values
  }

  function toIndex (inputs, input) {
    var index
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === input) {
        index = i
        break
      }
    }
    return index
  }

  function isValid (bool) {
    return function (inputs) {
      let allValid = toErrors(inputs).length === 0
      return allValid ? bool : !bool
    }
  }

  function sendForm (data) {
    if (!dom.hasAttribute('direction')) throw new Error('attempt to send form-vali without direction')
    let id = dom.id
    St(id + '.errors').value = []
    var formSender = Request(dom.getAttribute('direction'), data)
    if (dom.hasAttribute('ajax') && dom.getAttribute('ajax') === 'false') {
      window.location = formSender.getUrl()
    } else {
      return formSender
        .send()
        .then(function (response) {
          console.log('form-vali send response: ', response)
          St(id + '.formNotification').value = undefined
          St(id + '.formNotification').value = {
            success: response.success,
            text: response.text,
            result: response.result
          }
        })
    }
  }

  function init () {
    let id = dom.id
    let inputs = dom.querySelectorAll('[data-label]')
    let submitBtn = dom.querySelector('[data-submit]')

    let formSubmits = Dom$.click(submitBtn)
      .do(function () {
        St(id + '.errors').value = undefined
      })
      .map(function () {
        return extractData(inputs)
      })
      .mergeMap(validate)
      .publish()
    formSubmits.connect()

    this.onInputChange = Dom$.keydown(inputs)
      .map(function (ev) {
        return ev.currentTarget
      })
      .map(function (input) {
        return {
          i: toIndex(inputs, input),
          errors: St(id + '.errors').value
        }
      })
      .filter(function (v) {
        return v.errors && ~v.errors
          .map(function (e) { return e.i })
          .indexOf(v.i)
      })
      .subscribe(function (v) {
        v.errors.splice(v.i, 1)
        St(id + '.errors').value = undefined
        St(id + '.errors').value = v.errors
      })

    this.onValidationFail = formSubmits
      .filter(isValid(false))
      .map(toErrors)
      .subscribe((errors) => {
        St(id + '.errors').value = errors
      })

    this.onValidationSuccess = formSubmits
      .filter(isValid(true))
      .map(toValues)
      .subscribe(sendForm)
  }

  function destroy () {
    this.onValidationFail.dispose()
    this.onValidationSuccess.dispose()
    this.onInputChange.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
