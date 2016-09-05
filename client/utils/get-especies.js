var especies = []
function makeRequest () {
  return window.fetch('/especies')
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
function all () {
  return especies.sort((a, b) => (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0)
}
function byId (id) {
  console.log(id)
  console.log(especies)
  if (especies.length === 0) return 'No hay especies cargadas'
  var i = especies
    .map(function (e) { return e.id })
    .indexOf(id)
  if (!~i) return 'Especie desconocida'
  return especies[i].label
}
export {all, byId, makeRequest}
