module.exports = function (dom) {
  function init () {
    var type = dom.getAttribute('type')
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + type)
    svg.appendChild(use)
    dom.appendChild(svg)
  }

  return {
    init: init
  }
}

