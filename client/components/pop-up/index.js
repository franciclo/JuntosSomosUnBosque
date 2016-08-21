import './styles.css'
import 'document-register-element'
import $tate from 'state-stream'
import Rx from 'rxjs'

let streams = {}
class Modal extends HTMLDialogElement {
  connectedCallback () {
    let id = 'popups.list.' + this.getAttribute('data-path')
    $tate(id).value = {}
    streams[id] = {}
    streams.popUpClicks = Rx.Observable
      .fromEvent(this, 'click')
      .filter((e) => e.target.tagName === 'DIALOG')
      .filter(() => this.getAttribute('closable') !== 'false')
      .subscribe(() => {
        this.close()
      })
  }

  disconnectedCallback () {
    let id = 'popups.list.' + this.getAttribute('data-path')
    Object.keys(streams[id])
      .forEach(($) => {
        streams[id][$].unsubscribe()
      })
  }
}
window.customElements.define('pop-up', Modal, {extends: 'dialog'})

  // let closeIconClicks = Rx.Observable
  //   .fromEvent(this.querySelector('section>svg-icon[type="close"]'), 'click')

  // streams[id].closeCliks = Rx.Observable
  //   .merge(popUpClicks, closeIconClicks)
  //   .subscribe(function () {
  //     $tate(id + '.show').value = false
  //   })

  // createCloseIcon(this)

  // streams[id].onActive = $tate(id + '.active')
  //   .on(['N', 'E'])
  //   .subscribe(function (id) {
  //     toggleActiveSection(this, id)
  //   })

  // streams[id].onShow = $tate(id + '.show')
  //   .on(['N', 'E'])
  //   .subscribe(function (show) {
  //     toggleVisibility(this, show)
  //   })
