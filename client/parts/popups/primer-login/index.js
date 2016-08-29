import './styles.css'

import 'components/pop-up'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from '../form'
export default class PrimerLogin extends Component {
  constructor () {
    super()
    this.state = {
      andaGeoLocal: 'geolocation' in navigator,
      geoLocalResult: []
    }
    this.setUbicacionLocal = this.setUbicacionLocal.bind(this)
  }

  componentWillMount() {
  
  }
  setUbicacionLocal (e) {
    if ('geolocation' in navigator) {
      navigator
        .geolocation
        .getCurrentPosition(
          pos => {
            this.setState({
              andaGeoLocal: true,
              geoLocalResult: [
                pos.coords.latitude,
                pos.coords.longitude
              ]
            })
            console.log('nueva pos')
          },
          err => {
            console.warn(err)
            this.setState({andaGeoLocal: false})
          }
        )
    } else {
      this.setState({andaGeoLocal: false})
    }
  }

  onSuccess (res) {
    console.log(res)
  }

  onSubmit (data, sf) {
    debugger
  }

  render () {
    return (
      <dialog
        id='primerLogin'
        is='pop-up'
        active={this.props.active}>
        <Form
          action='/terminar-registro'
          failAlert='true'
          successAlert='true'
          data-auto='false'
          onSuccess={this.onSuccess}
          onSubmit={this.onSubmit}>
          <label className='legend'>
            Completa estos datos para comenzar a usar tu cuenta.
          </label>
          <div className='form-row-field'>
            <label htmlFor='type'>Tipo de usuario</label>
            <select id='type' name='userType'>
              <option className='default'>Elegí</option>
              <option value='per'>Persona</option>
              <option value='viv'>Vivero</option>
              <option value='org'>Organización civil</option>
              <option value='esc'>Escuela</option>
              <option value='cul'>Centro cultural</option>
            </select>
          </div>
          <div className='form-row-field'>
            <label htmlFor='ubicacion'>
              Ubicación
              <span className='ubicacion-info'>Hace click para elegir tu ubicación</span>
            </label>
            <geo-select
              name='ubicacion'
              id='ubicacion'
              point={this.state.geoLocalResult}
            ></geo-select>
            {
              this.state.andaGeoLocal &&
              (
                <button
                  type='button'
                  onClick={this.setUbicacionLocal}
                  className="usar-auto-geo">
                  Usar ubicación actual
                </button>
              )
            }
          </div>
          <div className='form-row-field'>
            <button data-submit >Ingresar</button>
          </div>
        </Form>
      </dialog>
    )
  }
}


// dom.querySelector('#elegirUbicacion'), 'click')
//       .subscribe(function () {
//         if ('geolocation' in navigator) {
//           try {
//             navigator.geolocation.getCurrentPosition(function (position) {
//               geoSuccess(dom, position)
//             }, geoError)
//           } catch (err) {
//             console.error('fallo geolocation')
//             geoSuccess(dom, {coords: {latitude: -34.55, longitude: -58.45}})
//           }
//         } else {
//           geoSuccess(dom, {coords: {latitude: -34.55, longitude: -58.45}})
//         }


  // geoSuccess (dom, position) {
  //   dom.querySelector('#primeraVez [data-submit]').style.display = 'block'
  //   dom.querySelector('#elegirUbicacion').style.display = 'none'
  //   var div = dom.querySelector('#ubicacionLocalFormWelcome')
  //   div.style.display = 'block'
  //   var map = window.L.map(div).setView([position.coords.latitude, position.coords.longitude], 13)
  //   window.L.Icon.Default.imagePath = '/images'
  //   window.L.tileLayer(
  //     'https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
  //     {
  //       tileSize: 512,
  //       zoomOffset: -1
  //     })
  //     .addTo(map)
  //   var marker = window.L.marker([position.coords.latitude.toFixed(3), position.coords.longitude.toFixed(3)]).addTo(map)
  //   dom.querySelector('[data-id='locationInput']').value = position.coords.latitude.toFixed(3) + '::' + position.coords.longitude.toFixed(3)
  //   map.on('click', function (ev) {
  //     marker.setLatLng(ev.latlng)
  //     dom.querySelector('[data-id='locationInput']').value = ev.latlng.lat.toFixed(3) + '::' + ev.latlng.lng.toFixed(3)
  //   })
  // }


