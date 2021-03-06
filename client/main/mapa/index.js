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
      red: [],
      festi: {}
    }
    this.fetchRed = this.fetchRed.bind(this)
    this.userArboles = window.$tate('user.arboles').on('N')
  }

  componentWillMount () {
    this.fetchRed()
    window.$tate('map.popups.active').value = ''
    this.userArboles
      .subscribe(() => { this.fetchRed() })
    window.$tate('festival')
      .on(['N', 'E'])
      .subscribe(festival => {
        this.setState({ festi: festival })
      })
  }

  fetchRed () {
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
    let festiLoc = {}
    try {
      festiLoc = JSON.parse(this.state.festi.locacion)
    } catch (err) {
      festiLoc = {lat: 0, lng: 0}
    }

    return (
      <Map
        id='mapa'
        center={position}
        zoom={this.state.zoom}
        onClick={e => {
          window.$tate('map.popups.active').value = ''
        }}>
        <TileLayer
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ' />
        {
          this.state.red
            .map((user, i) => {
              return <UserMarker
                position={user.location}
                user={user}
                key={i} />
            })
        }
        {
          this.state.festi &&
            <FestiMarker
              position={[festiLoc.lat, festiLoc.lng]}
              className='festi-marker' />
        }
      </Map>
    )
  }
}
