import St from 'state'
import {className} from 'domHelpers'

module.exports = function (dom) {
  function toggleActiveSection (id) {
    var sidebarActionButtons = dom.querySelectorAll('#action_menu button')
    for (var i = 0; i < sidebarActionButtons.length; i++) {
      if (sidebarActionButtons[i].getAttribute('data-target') === id) {
        className.add(sidebarActionButtons[i], 'active')
      } else {
        className.remove(sidebarActionButtons[i], 'active')
      }
    }

    var sidebarActionContent = dom.querySelectorAll('.action-content')
    for (var y = 0; y < sidebarActionContent.length; y++) {
      if (sidebarActionContent[y].id === id) {
        className.add(sidebarActionContent[y], 'active')
      } else {
        className.remove(sidebarActionContent[y], 'active')
      }
    }
  }

  function toggleActiveInfoSection (id) {
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

  function init () {
    var nombre = St('user.name').value
    dom.querySelector('[data-id="user-btn"] span').textContent = nombre
    this.onActiveContent = St('mainApp.content')
      .on(['N', 'E'])
      .subscribe(toggleActiveSection)

    St('masInfo.content')
      .on(['N', 'E'])
      .subscribe(toggleActiveInfoSection)

    St('primeraVez.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          St('popUpBienvenido.show').value = false
        }, 2000)
      })
  }

  function destroy () {
    this.onActiveContent.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
