import './styles.css'

import 'document-register-element'
import 'whatwg-fetch'
import 'custom-event-polyfill'

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
    console.log(cb)
    this.submitCallBack = cb
  }

  onResponse (cb) {
    console.log(cb)
    this.responseCallBack = cb
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = new window.FormData(e.target)
    console.log('form-async onResponse', this.submitCallBack)
    if (typeof this.submitCallBack === 'function') this.submitCallBack(data)
    if (e.target.getAttribute('data-auto') !== 'false') {
      this.sendForm(data)
      return
    }
    console.warn('Form not sended', e.target)
  }

  sendForm (data) {
    if (!this.action) throw new Error('form-async needs action')
    let action = this.getAttribute('action')
    window.fetch(
      action,
      {
        credentials: 'same-origin',
        method: 'post',
        body: data
      })
      .catch(err => { console.warn('Request Internal Error action="' + action + '"', err) })
      .then(res => {
        console.log('form-async onSubmit', this.responseCallBack)
        if (typeof this.responseCallBack === 'function') {
          this.responseCallBack(res)
        }
      })
  }
}
window.customElements.define('form-async', FormAsync, {extends: 'form'})
