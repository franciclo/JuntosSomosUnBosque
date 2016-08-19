import 'leaflet/dist/leaflet.css'
import './styles.css'

import 'state-stream'
import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import FestiPoint from './festi-point'

export default class Mapa extends Component {
  constructor () {
    super()
    this.state = {
      lat:-34.53753049571174,
      lng:-58.44419449567794,
      zoom: 13
    }
  }

  clickMap (e) {
    // debugger
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map
        id='mapa'
        center={position}
        zoom={this.state.zoom}
        onClick={this.clickMap}>
        <TileLayer
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ'
        />
        <FestiPoint
          position={position} />
      </Map>
    )
  }
}
