module.exports = function (k) {
  let colors = [
    '#2bd873',
    '#5fedd5',
    '#009aff',
    '#153add',
    '#ff3642',
    '#ff687b',
    '#ec9c55'
  ]
  return colors[(colors.length - 1) < k ? 0 : k]
}
// style={{
//   background: this.rainbow(key)
// }}
