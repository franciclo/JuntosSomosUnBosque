import St from 'state'
import {className} from 'domHelpers'

module.exports = function (dom) {
  function toggleActiveSection (id) {
    console.log('toggleActiveSection')
    var sidebarActionButtons = dom.querySelectorAll('#action_menu button')
    for (var i = 0; i < sidebarActionButtons.length; i++) {
      if (sidebarActionButtons[i].getAttribute('data-target') === id) {
        className.add(sidebarActionButtons[i], 'active')
      } else {
        className.remove(sidebarActionButtons[i], 'active')
      }
    }

    var sidebarActionContent = dom.querySelectorAll('.action-content')
    for (var i = 0; i < sidebarActionContent.length; i++) {
      if (sidebarActionContent[i].id === id) {
        className.add(sidebarActionContent[i], 'active')
      } else {
        className.remove(sidebarActionContent[i], 'active')
      }
    }
  }

  function init () {
    this.onActiveContent = St('mainApp.content')
      .on(['N', 'E'])
      .subscribe(toggleActiveSection)
  }

  function destroy () {
    this.onActiveContent.dispose()
  }

  return {
    init: init,
    destroy: destroy
  }
}
