import St from 'state-stream'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}
    St(id + '.center').value = [-34.55, -58.446]
  }

  function destroy () {
    this.popupCliks.unsubscribe()
  }

  return {init, destroy}
}
