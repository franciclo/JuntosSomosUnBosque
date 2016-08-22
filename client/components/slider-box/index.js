import './styles.css'

import 'document-register-element'
import {toggleActiveSection} from './functions'

let streams = {}
class SliderBox extends window.HTMLElement {
  connectedCallback () {
    let id = this.getAttribute('data-path')
    window.$tate(id).value = {}
    streams[id] = {}

    streams[id].activate = window.$tate(id + '.active')
      .on(['N', 'E'])
      .subscribe((active) => {
        toggleActiveSection(this, active)
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
window.customElements.define('slider-box', SliderBox)
