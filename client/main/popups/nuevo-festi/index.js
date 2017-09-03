import './styles.css'

import 'components/dia-log'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from 'utils/form'

export default class NuevoFesti extends Component {
  constructor () {
    super()
    this.state = {
      geoLocalResult: [-34.539, -58.446],
      titulo: '',
      desc: '',
      fecha: ''
    }
    this.updateLocation = this.updateLocation.bind(this)
  }

  updateTitulo (e) {
    this.setState({titulo: e.target.value})
  }

  updateFecha (e) {
    this.setState({fecha: e.target.value})
  }

  updateDesc (e) {
    this.setState({desc: e.target.value})
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
    window.$tate('user.primerLogin').value = false
    window.$tate('popups.active').value = 'getStarted'
  }

  render () {
    return (
      <dia-log
        id='nuevoFesti'
        data-is='pop-up'
        data-open-modal={this.props.open}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close' />
        <Form
          action='/nuevo-festi'
          failAlert='true'
          onSuccess={this.onSuccess}>
          <label className='legend'>
            Nuevo Festival
          </label>
          <div className='form-row-field'>
            <label htmlFor='titulo'>Titulo</label>
            <input
              name='titulo'
              id='titulo'
              type='text'
              onChange={this.updateTitulo}
              value={this.state.titulo} />
          </div>
          <div className='form-row-field'>
            <label htmlFor='desc'>Descripción</label>
            <textarea
              name='desc'
              id='desc'
              type='text'
              onChange={this.updateDesc}
              value={this.state.desc} />
          </div>
          <div className='form-row-field'>
            <label htmlFor='type'>Fecha</label>
            <input
              name='fecha'
              id='fecha'
              type='date'
              onChange={this.updateFecha}
              value={this.state.fecha} />
          </div>
          <div className='form-row-field'>
            <label>
              Ubicación
              <span className='ubicacion-info'>Hace click para elegir la ubicación</span>
            </label>
            <geo-select
              data-id='nuevoFesti'
              onClick={this.updateLocation}
              lat={this.state.geoLocalResult[0]}
              lng={this.state.geoLocalResult[1]}
              visible={this.props.open ? 'true' : 'false'}>
              <input type='hidden' name='location' />
            </geo-select>
          </div>
          <div className='form-row-field'>
            <button data-submit >Guardar</button>
          </div>
        </Form>
      </dia-log>
    )
  }
}
