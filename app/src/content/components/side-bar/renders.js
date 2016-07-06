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
        className.remove(popUpSections[i], 'hide')
      } else {
        className.remove(popUpSections[i], 'active')
        className.add(popUpSections[i], 'hide')
      }
    }
  }

  function init (dom) {
    var id = dom.id

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
