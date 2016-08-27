import './styles.css'

import 'document-register-element'
import 'whatwg-fetch'

class FormAsync extends window.HTMLFormElement {
  connectedCallback () {
    this.responseCallBack = v => v
    this.submitCallBack = v => v
    this.failCallBack = v => { console.warn(v); return v }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onResponse = this.onResponse.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.sendForm = this.sendForm.bind(this)
    this.addEventListener('submit', this.handleSubmit)
  }

  disconnectedCallback () {
    this.removeEventListener('submit', this.handleSubmit)
  }

  onSubmit (cb) {
    this.submitCallBack = cb
  }

  onResponse (cb) {
    this.responseCallBack = cb
  }

  onFail (cb) {
    this.failCallBack = cb
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = new window.FormData(e.target)
    if (this.submitCallBack) this.submitCallBack(data)
    if (e.target.getAttribute('data-auto') !== 'false') {
      this.sendForm(data)
    }
  }

  sendForm (data) {
    if (!this.action) throw new Error('form-async needs action')
    let action = this.getAttribute('action')
    window.fetch(
      action,
      {
        method: 'post',
        body: data
      })
      .catch(err => this.failCallback(err))
      .then(this.responseCallBack)
  }
}
window.customElements.define('form-async', FormAsync, {extends: 'form'})
