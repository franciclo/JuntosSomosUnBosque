import popUpHtml from '../event-pop/template.html'
import St from 'state'
import 'leaflet'

export default function () {
  function init (dom) {
    var div = dom.appendChild(document.createElement('div'))
    div.id = 'mapContainer'
    var map = window.L.map(div, {zoomControl: false}).setView([-34.55, -58.446], 13)

    window.L.Icon.Default.imagePath = '/images'

    window.L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
      {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(map)

    window.L.popup({
      maxWidth: 500,
      closeOnClick: false,
      closeButton: false
    })
    .setLatLng([-34.539, -58.446])
    .setContent(popUpHtml)
    .openOn(map)

    St(dom.id + '.center')
      .on('N')
      .subscribe((center) => {
        map.setView(new window.L.LatLng(center[0], center[1]), 13)
      })

    map.on('mousedown', function (e) {
      if (St('festival_pop.show').value) St('festival_pop.show').value = false
    })
  }

  return {init}
}
