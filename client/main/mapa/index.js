import 'leaflet/dist/leaflet.css'
import './styles.css'

import React, {Component} from 'react'
import { Map, TileLayer } from 'react-leaflet'
import FestiMarker from './festi-marker'
import UserMarker from './user-marker'

export default class Mapa extends Component {
  constructor () {
    super()
    this.state = {
      lat: -34.53753049571174,
      lng: -58.44419449567794,
      zoom: 11,
      red: []
    }
  }

  componentWillMount () {
    window.fetch('/red')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success) {
          this.setState({
            red: res.result
          })
        } else {
          console.log('error al pedir la red', res)
        }
      })
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map
        id='mapa'
        center={position}
        zoom={this.state.zoom}>
        <TileLayer
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ' />
        <FestiMarker
          position={position}
          className='festi-marker' />
        {
          this.state.red
            .map((user, i) => {
              return <UserMarker
                position={user.location}
                user={user}
                key={i} />
            })
        }
      </Map>
    )
  }
}

