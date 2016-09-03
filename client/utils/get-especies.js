var especies = []
function makeRequest () {
  window.fetch('/especies')
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (res.success) {
        especies = res.result
      } else {
        console.warn('Error al pedir las especies', res)
      }
    })
}
function all (label) {
  if (especies.length === 0) return 'No hay especies cargadas'
  if (!especies[0].hasOwnProperty(label)) {
    label = 'singular'
  }
  return especies
    .map(function (e) {
      return {
        id: e._id,
        label: e[label]
      }
    })
}
function byId (id, label) {
  if (especies.length === 0) return 'No hay especies cargadas'
  var i = especies
    .map(function (e) { return e._id })
    .indexOf(id)
  if (!~i) return 'Especie desconocida'
  if (!especies[i].hasOwnProperty(label)) {
    label = 'singular'
  }
  return especies[i][label]
}
export {all, byId, makeRequest}
