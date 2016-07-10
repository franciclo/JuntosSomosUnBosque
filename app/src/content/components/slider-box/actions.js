import St from 'state'
export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}
  }

  return {init}
}
