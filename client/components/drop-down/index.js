import './styles.css'

import 'document-register-element'

class DropDown extends window.HTMLElement {
  connectedCallback () {
    this.addEventListener('click', this.handleClick)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this.handleClick)
  }
  handleClick (e) {
    if (e.target.tagName === 'DIA-LOG') return
    const openVal = !this.getAttribute('data-open') ? 'open' : ''
    this.setAttribute('data-open', openVal)
    this.getElementsByTagName('dia-log')[0]
      .setAttribute('data-open', openVal)
  }
}
window.customElements.define('drop-down', DropDown)
