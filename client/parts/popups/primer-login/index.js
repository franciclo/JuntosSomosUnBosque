import './styles.css'

import 'components/dia-log'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from '../form'
export default class PrimerLogin extends Component {
  constructor () {
    super()
    this.state = {
      andaGeoLocal: 'geolocation' in navigator,
      geoLocalResult: [-34.539, -58.446]
    }
    this.setUbicacionLocal = this.setUbicacionLocal.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
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

  updateLocation (e) {
    this.setState({geoLocalResult: [
      e.currentTarget.getAttribute('lat'),
      e.currentTarget.getAttribute('lng')
    ]})
  }

  onSuccess (res) {
    window.$tate('popups.active').value = null
    let user = window.$tate('user').value
    window.$tate('user').value = undefined
    user.primerLogin = false
    user.userType = res.type
    user.location = res.location
    window.$tate('user').value = user
  }

  render () {
    return (
      <dia-log
        id='primerLogin'
        data-is='pop-up'
        data-open-modal={this.props.open}>
        <Form
          action='/terminar-registro'
          failAlert='true'
          onSuccess={this.onSuccess}>
          <label className='legend'>
            Completa estos datos para comenzar a usar tu cuenta.
          </label>
          <div className='form-row-field'>
            <label htmlFor='type'>Tipo de usuario</label>
            <select id='type' name='userType'>
              <option value='per'>Persona</option>
              <option value='viv'>Vivero</option>
              <option value='org'>Organización civil</option>
              <option value='esc'>Escuela</option>
              <option value='cul'>Centro cultural</option>
            </select>
          </div>
          <div className='form-row-field'>
            <label>
              Ubicación
              <span className='ubicacion-info'>Hace click para elegir tu ubicación</span>
            </label>
            <geo-select
              onClick={this.updateLocation}
              lat={this.state.geoLocalResult[0]}
              lng={this.state.geoLocalResult[1]}>
              <input type='hidden' name='location' />
            </geo-select>
            {
              this.state.andaGeoLocal &&
              (
                <button
                  type='button'
                  onClick={this.setUbicacionLocal}
                  className='usar-auto-geo'>
                  Usar ubicación actual
                </button>
              )
            }
          </div>
          <div className='form-row-field'>
            <button data-submit >Ingresar</button>
          </div>
        </Form>
      </dia-log>
    )
  }
}
