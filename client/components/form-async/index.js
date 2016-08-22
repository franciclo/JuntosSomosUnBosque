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
    this.$ubmit = Rx.Observable
      .fromEvent(this, 'submit')
      .filter(e => e.target.checkValidity())
      .do(e => e.preventDefault())

    if (this.getAttribute('data-auto') !== 'false') {
      streams[id].$ubmit = this.$ubmit
        .subscribe(this.sendForm)
    }
  }

  sendForm () {
    if (!this.action) throw new Error('form-async needs action')
    let data = new window.FormData(this)
    let id = this.getAttribute('data-path')
    window.fetch(
      this.getAttribute('action'), {
        method: 'post',
        body: data
      })
      .then((res) => {
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
