import './styles.css'

import 'document-register-element'
import L from 'leaflet'

class GeoSelect extends window.HTMLElement {
  constructor () {
    super()
    this.value = [-34.539, -58.446]
  }
  connectedCallback () {
    this.map = L.map(this).setView([-34.539, -58.446], 9)

    window.L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
      {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(this.map)
    this.marker = L.marker([-34.539, -58.446]).addTo(this.map)
    this.map.on('click', e => {
      this.marker.setLatLng(e.latlng)
      this.value = e.latlng
    })
  }

  static get observedAttributes () {
    return ['point']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'point') {
      if (~newValue.indexOf(',')) {
        let coords = newValue.split(',')
        this.marker.setLatLng(coords)
        this.map.setView(coords, 9)
      }
    }
  }

}

window.customElements.define('geo-select', GeoSelect)
