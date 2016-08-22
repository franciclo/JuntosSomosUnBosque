import './styles.css'

import 'document-register-element'
import Rx from 'rxjs'

let streams = {}
class PopUp extends window.HTMLDialogElement {
  connectedCallback () {
    let popUpClicks = Rx.Observable
      .fromEvent(this, 'click')
      .filter((e) => e.target.tagName === 'DIALOG')
      .filter(() => this.getAttribute('closable') !== 'false')

    let closeBtn = document.createElement('img')
    closeBtn.alt = 'Cerrar'
    closeBtn.src = this.getAttribute('data-icon') === 'fff'
      ? 'close-fff.svg'
      : 'close.svg'
    closeBtn = this.appendChild(closeBtn)
    let closeBtnClicks = Rx.Observable
      .fromEvent(closeBtn, 'click')

    streams.clo$e = Rx.Observable
      .merge(popUpClicks, closeBtnClicks)
      .subscribe(() => {
        this.setAttribute('active', '')
        window.$tate('popups.active').value = ''
      })
  }

  disconnectedCallback () {
    let id = 'popups.list.' + this.getAttribute('data-path')
    Object.keys(streams[id])
      .forEach(($) => {
        streams[id][$].unsubscribe()
      })
  }

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
