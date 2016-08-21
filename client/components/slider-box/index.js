import './styles.css'

import 'document-register-element'
import $t from 'state-stream'
import {toggleActiveSection} from './functions'

let streams = {}
class SliderBox extends HTMLElement {
  connectedCallback () {
    let id = this.getAttribute('data-path')
    $t(id).value = {}
    streams[id] = {}

    streams[id].activate = $t(id + '.active')
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
