import './styles.css'

import 'document-register-element'
import 'whatwg-fetch'

class FormAsync extends window.HTMLFormElement {
  connectedCallback () {
    this.responseCallBack = null
    this.submitCallBack = null
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

  handleSubmit (e) {
    e.preventDefault()
    const data = new window.FormData(e.target)
    if (e.target.getAttribute('data-auto') !== 'false') {
      if(this.responseCallBack) {
        this.responseCallBack(data)
      }
      this.sendForm(data)
      return
    }
    if(this.responseCallBack) {
      this.responseCallBack(data)
      return
    }
    console.warn('FormAsync not being handled on submit, to automatically send the form set data-auto attribute to "false"')
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
      .then(this.responseCallBack)
      .catch(err => console.error('FormAsync fetch fail', err))
  }
}
window.customElements.define('form-async', FormAsync, {extends: 'form'})
