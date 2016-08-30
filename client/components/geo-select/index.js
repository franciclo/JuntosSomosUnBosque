import './styles.css'

import 'document-register-element'
import L from 'leaflet'

class GeoSelect extends window.HTMLElement {
  constructor () {
    super()
    this.cnx = false
  }
  connectedCallback () {
    console.log('this.sarasa', this.sarasa)
    const coords = [
      +this.getAttribute('lat'),
      +this.getAttribute('lng')
    ]
    this.map = L.map(this).setView(coords, 9)
    this.querySelector('input').value = JSON.stringify(coords)
    window.L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
      {
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(this.map)
    this.marker = L.marker(coords).addTo(this.map)
    this.map.on('click', e => {
      this.setAttribute('lat', e.latlng.lat)
      this.setAttribute('lng', e.latlng.lng)
    })
  }

  disconnectedCallback () {
    this.map.remove()
  }
  static get observedAttributes () {
    return ['lat', 'lng']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    debugger
    if (!this.parentNode) return
    switch (name) {
      case 'lat':
        if (+newValue) {
          let coords = [+newValue, +this.getAttribute('lng')]
          this.marker.setLatLng(coords)
          this.map.setView(coords)
          this.querySelector('input').value = JSON.stringify(coords)
        }
        break
      case 'lng':
        if (+newValue) {
          let coords = [+this.getAttribute('lat'), +newValue]
          this.marker.setLatLng(coords)
          this.map.setView(coords)
          this.querySelector('input').value = JSON.stringify(coords)
        }
        break
    }
  }
}

window.customElements.define('geo-select', GeoSelect)
