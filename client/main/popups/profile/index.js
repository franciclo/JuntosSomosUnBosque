import './styles.css'

import 'components/dia-log'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from 'utils/form'

export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      andaGeoLocal: 'geolocation' in navigator,
      geoLocalResult: [-34.539, -58.446],
      nombre: '',
      userType: ''
    }
    this.setUbicacionLocal = this.setUbicacionLocal.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateUserType = this.updateUserType.bind(this)
    this.updateNombre = this.updateNombre.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open === 'open') {
      this.setState({
        userType: nextProps.userType,
        geoLocalResult: [
          nextProps.location.lat,
          nextProps.location.lng
        ],
        nombre: nextProps.nombre
      })
    }
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
    window.$tate('user.userType').value = res.userType
    window.$tate('user.location').value = res.location
    window.$tate('user.nombre').value = res.nombre
  }

  updateNombre (e) {
    this.setState({nombre: e.target.value})
  }

  updateUserType (e) {
    this.setState({userType: e.target.value})
  }

  render () {
    return (
      <dia-log
        id='perfil'
        data-open-modal={this.props.open}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <Form
          action='/perfil'
          failAlert='true'
          successAlert='true'
          onSuccess={this.onSuccess}>
          <label className='legend'>
            Perfil
          </label>
          <div className='form-row-field'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              name='nombre'
              id='nombre'
              type='text'
              onChange={this.updateNombre}
              value={this.state.nombre} />
          </div>
          <div className='form-row-field'>
            <label htmlFor='type'>Tipo de usuario</label>
            <select
              id='type'
              name='userType'
              onChange={this.updateUserType}
              value={this.state.userType}>
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
              data-id='perfil'
              onClick={this.updateLocation}
              lat={this.state.geoLocalResult[0]}
              lng={this.state.geoLocalResult[1]}
              visible={this.props.open ? 'true' : 'false'}>
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
            <button type='submit'>Guardar</button>
          </div>
        </Form>
      </dia-log>
    )
  }
}
