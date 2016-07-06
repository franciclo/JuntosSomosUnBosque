import St from 'state'

export default function () {
  function init (dom) {
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

  return {init}
}
