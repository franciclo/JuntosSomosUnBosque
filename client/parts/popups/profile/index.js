import './styles.css'

import 'components/dia-log'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from '../form'
export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      andaGeoLocal: 'geolocation' in navigator,
      geoLocalResult: window.$tate('user.location').value
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

  render () {
    const userType =window.$tate('user.type').value
    return (
      <dia-log
        id='perfil'
        data-open-modal={this.props.open}>
        <Form
          action='/perfil'
          failAlert='true'
          onSuccess={this.onSuccess}>
          <label className='legend'>
            Perfil
          </label>
          <div className='form-row-field'>
            <label htmlFor="nombre">Nombre</label>
            <input name='nombre' id='nombre' type="text" value={window.$tate('user.nombre').value}/>
          </div>
          <div className='form-row-field'>
            <label htmlFor='type'>Tipo de usuario</label>
            <select id='type' name='userType'>
              <option value='per' checked={userType === 'per'}>Persona</option>
              <option value='viv' checked={userType === 'viv'}>Vivero</option>
              <option value='org' checked={userType === 'org'}>Organización civil</option>
              <option value='esc' checked={userType === 'esc'}>Escuela</option>
              <option value='cul' checked={userType === 'cul'}>Centro cultural</option>
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
