import './styles.css'

import 'document-register-element'

class Dialog extends window.HTMLElement {
  // connectedCallback () {
  //   if (this.getAttribute('data-open-modal')) return this.showModal().bind(this)
  //   if (this.getAttribute('data-open')) return this.show()
  // }

  // show () {
  //   // this.
  // }

  // showModal () {
  //   // this.style.zIndex = 9
  // }
  // close () {

  // }

  // static get observedAttributes () {
  //   return ['active']
  // }

  // attributeChangedCallback (name, oldValue, newValue) {
  //   if (name === 'data-open-modal') {
  //     let open = this.getAttribute('open') === 'open'
  //     if (newValue) {
  //       if (!open && this.parentNode) this.showModal().bind(this)
  //     } else {
  //       if (open) this.close()
  //     }
  //   }
  // }
}
window.customElements.define('dia-log', Dialog)
