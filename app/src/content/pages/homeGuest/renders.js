import St from 'state'
import {className} from 'utils'

export default function () {
  function toggleActiveInfoSection (dom, id) {
    var infoActionButtons = dom.querySelectorAll('#mas_info_side_menu > p')
    for (var i = 0; i < infoActionButtons.length; i++) {
      if (infoActionButtons[i].getAttribute('data-target') === id) {
        className.add(infoActionButtons[i], 'active')
      } else {
        className.remove(infoActionButtons[i], 'active')
      }
    }

    var infoActionContent = dom.querySelectorAll('#mas_info_text > div')
    for (var y = 0; y < infoActionContent.length; y++) {
      if (infoActionContent[y].id === id) {
        className.add(infoActionContent[y], 'active')
      } else {
        className.remove(infoActionContent[y], 'active')
      }
    }
  }

  function init (dom) {
    St('masInfo.content')
      .on(['N', 'E'])
      .subscribe(function (id) {
        toggleActiveInfoSection(dom, id)
      })

    St('festival_pop.show')
      .on('E')
      .subscribe(function (b) {
        className.bool(b, dom.querySelector('#cartel_evento'), 'off')
      })

    St('main_menu.active')
      .on(['N', 'E'])
      .subscribe(function (active) {
        var menuBtns = dom.querySelectorAll('#home_sidebar header .menu>div')
        for (var i = menuBtns.length - 1; i >= 0; i--) {
          var b = menuBtns[i].getAttribute('data-target') === active
          className.bool(b, menuBtns[i], 'active')
        }
      })
  }

  function destroy () {
    this.onActiveContent.unsubscribe()
  }

  return {init, destroy}
}
