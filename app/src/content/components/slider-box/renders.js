import St from 'state'
import {className} from 'utils'

export default function () {
  function toggleActiveSection (dom, activeId) {
    var boxSections = dom.querySelectorAll('article')
    for (var i = 0; i < boxSections.length; i++) {
      className.bool(
        boxSections[i].getAttribute('data-id') === activeId,
        boxSections[i],
        boxSections[i].getAttribute('data-enter') + ' active'
      )
    }
  }

  function init (dom) {
    var id = dom.id
    this.onActive = St(id + '.active')
      .on(['N', 'E'])
      .subscribe(function (activeId) {
        toggleActiveSection(dom, activeId)
      })
  }

  function destroy () {
    this.onActive.unsubscribe()
  }

  return {init, destroy}
}
