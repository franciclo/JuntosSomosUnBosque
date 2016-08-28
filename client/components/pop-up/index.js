import './styles.css'

import 'document-register-element'

class PopUp extends window.HTMLDialogElement {
  static get observedAttributes () {
    return ['active']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.parentNode) return
    if (name === 'active') {
      let open = this.getAttribute('open') === ''
      if (newValue) {
        if (!open) this.showModal()
      } else {
        if (open) this.close()
      }
    }
  }
}
window.customElements.define('pop-up', PopUp, {extends: 'dialog'})
