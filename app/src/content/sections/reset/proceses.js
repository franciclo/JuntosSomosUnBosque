import St from 'state'

module.exports = function (dom) {
  function init () {
    St('popUpReset.show').value = true
    St('popUpReset.active').value = 'resetPassword'
  }

  function destroy (s, f) {}

  return {
    init: init,
    destroy: destroy
  }
}
