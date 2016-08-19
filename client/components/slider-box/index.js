import './styles.css'
import 'document-register-element'
import $t from 'state-stream'
import {toggleActiveSection} from './functions'

let customElement = Object.create(window.HTMLElement.prototype)
let streams = {}

customElement.attachedCallback = function () {
  var id = this.getAttribute('data-path')
  $t(id).value = {}
  streams[id] = {}

  streams[id].activate = $t(id + '.active')
    .on(['N', 'E'])
    .subscribe((active) => {
      toggleActiveSection(this, active)
    })
}

customElement.detachedCallback = function () {
  var id = this.getAttribute('data-path')
  Object.keys(streams[id])
    .forEach(function ($) {
      $.unsubscribe()
    })
}

document.registerElement('slider-box', { prototype: customElement })
