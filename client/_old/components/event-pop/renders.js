import {className} from 'utils'
import St from 'state-stream'

export default function () {
  function togglePop (dom, bool) {
    if (bool) {
      className.add(document.querySelector('event-pop').parentNode.parentNode.parentNode, 'expanded')
      className.add(dom.querySelector('article'), 'active')
      St('homeMap.center').value = undefined
      St('homeMap.center').value = [-34.51, -58.446]
    } else {
      className.remove(document.querySelector('event-pop').parentNode.parentNode.parentNode, 'expanded')
      className.remove(dom.querySelector('article'), 'active')
      St('homeMap.center').value = undefined
      St('homeMap.center').value = [-34.55, -58.446]
    }
  }

  function init (dom) {
    St(dom.id + '.show')
      .on('E')
      .subscribe((bool) => togglePop(dom, bool))
  }

  function destroy () {

  }

  return {init, destroy}
}
