import 'leaflet/dist/leaflet.css'
import './styles.css'

import 'state-stream'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React, {Component} from 'react'

export default class Mapa extends Component {
  constructor () {
    super()
    this.state = {
      lat: -34.55,
      lng: -58.44,
      zoom: 13
    }
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map id='mapa' center={position} zoom={this.state.zoom}>
        <TileLayer
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}
