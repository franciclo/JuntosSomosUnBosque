import './styles.css'

import 'document-register-element'
import L from 'leaflet'
let mapas = {}
class GeoSelect extends window.HTMLElement {
  disconnectedCallback () {
    mapas[this.getAttribute('data-id')].map.remove()
  }

  static get observedAttributes () {
    return ['lat', 'lng', 'visible']
  }

  connectedCallback () {
    const coords = [
      +this.getAttribute('lat') || 0,
      +this.getAttribute('lng') || 0
    ]
    this.querySelector('input').value = JSON.stringify(coords)
    const id = this.getAttribute('data-id')
    if (!mapas[id]) {
      mapas[id] = {}
      mapas[id].map = L.map(this).setView(coords, 9)
      window.L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
        {
          attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1
        })
        .addTo(mapas[id].map)
      mapas[id].marker = L.marker(coords).addTo(mapas[id].map)
    }
    mapas[id].map.on('click', e => {
      this.setAttribute('lat', e.latlng.lat)
      this.setAttribute('lng', e.latlng.lng)
    })
    this.map = mapas[id].map
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.parentNode) return
    const id = this.getAttribute('data-id')
    let coords = [
      +this.getAttribute('lat') || 0,
      +this.getAttribute('lng') || 0
    ]
    if (name === 'lat') {
      coords[0] = +newValue
    } else if (name === 'lng') {
      coords[1] = +newValue
    } else if (name === 'visible') {
      mapas[id].map.setView(coords)
      if (newValue) {
        console.log('invalidateSize')
        return mapas[id].map.invalidateSize()
      }
      return
    }
    if (!mapas[id]) {
      mapas[id] = {}
      mapas[id].map = L.map(this).setView(coords, 9)
      window.L.tileLayer('https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
        {
          attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1
        })
        .addTo(mapas[id].map)
      mapas[id].marker = L.marker(coords).addTo(mapas[id].map)
    }
    mapas[id].marker.setLatLng(coords)
    mapas[id].map.setView(coords)
    this.querySelector('input').value = JSON.stringify(coords)
  }

}

window.customElements.define('geo-select', GeoSelect)
