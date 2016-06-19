import St from 'state'

module.exports = function (dom) {
  function init () {
    St('popUpReset.show').value = true
    St('popUpReset.active').value = 'resetPassword'
    dom.querySelector('[data-label="email"]').value = St('user.mail').value
    dom.querySelector('[data-label="codigo"]').value = window.location.search.split('=')[1]
    St('reset.formNotification').on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function () {
        window.setTimeout(function () {
          window.location = '/'
        }, 4000)
      })
  }

  function destroy (s, f) {}

  return {
    init: init,
    destroy: destroy
  }
}
