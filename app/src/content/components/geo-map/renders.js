var L = require('leaflet')
module.exports = function (dom) {
  function init () {
    var div = dom.appendChild(document.createElement('div'))
    div.id = 'mapContainer'
    var map = L.map(div, {zoomControl: false}).setView([-34.59, -58.50], 11)

    L.Icon.Default.imagePath = '/images'

    L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
      {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(map)
  }

  return {
    init: init
  }
}
