import './styles.css'

import 'document-register-element'
import 'whatwg-fetch'
import Rx from 'rxjs'

let streams = {}
class FormAsync extends window.HTMLFormElement {
  connectedCallback () {
    let id = this.getAttribute('data-path')
    streams[id] = {}
    window.$tate(id).value = {}
    this.sendForm = this.sendForm.bind(this)
    this.submitStream = Rx.Observable
      .fromEvent(this, 'submit')
      .filter(e => e.target.checkValidity())
      .do(e => e.preventDefault())
      .map(e => new window.FormData(e.target))

    if (this.getAttribute('data-auto') !== 'false') {
      streams[id].submitStream = this.submitStream
        .subscribe(this.sendForm)
    }
  }

  sendForm (data) {
    if (!this.action) throw new Error('form-async needs action')
    let id = this.getAttribute('data-path')

    for (var value of data.values()) {
       console.log(value)
    }

    let action = this.getAttribute('action')
    window.fetch(
      action,
      {
        method: 'post',
        body: data
      })
      .then(res => {
        window.$tate(id + '.result').value = undefined
        window.$tate(id + '.result').value = res
      })
  }

  disconnectedCallback () {
    let id = this.getAttribute('data-path')
    Object.keys(streams[id])
      .forEach(($) => {
        streams[id][$].unsubscribe()
      })
  }
}
window.customElements.define('form-async', FormAsync, {extends: 'form'})
