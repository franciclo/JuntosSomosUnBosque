import St from 'state'
import {className} from 'utils'

export default function () {
  function toggleVisibility (dom, show) {
    if (show) {
      className.add(dom, 'active')
    } else {
      className.remove(dom, 'active')
    }
  }

  function toggleActiveSection (dom, id) {
    var popUpSections = dom.querySelectorAll('article')
    for (var i = 0; i < popUpSections.length; i++) {
      if (popUpSections[i].getAttribute('data-id') === id) {
        className.add(popUpSections[i], 'active')
      } else {
        className.remove(popUpSections[i], 'active')
      }
    }
  }

  function createCloseIcon (dom) {
    var closeIcon = document.createElement('svg-icon')
    closeIcon.setAttribute('type', 'close')
    if (dom.getAttribute('closable') === 'false') closeIcon.className = 'hide'
    dom.querySelector('section').appendChild(closeIcon)
  }

  function init (dom) {
    var id = dom.id
    createCloseIcon(dom)

    this.onActive = St(id + '.active')
      .on(['N', 'E'])
      .subscribe(function (id) {
        toggleActiveSection(dom, id)
      })

    this.onShow = St(id + '.show')
      .on(['N', 'E'])
      .subscribe(function (show) {
        toggleVisibility(dom, show)
      })
  }

  function destroy () {
    this.onActive.dispose()
    this.onShow.dispose()
  }

  return {init, destroy}
}
