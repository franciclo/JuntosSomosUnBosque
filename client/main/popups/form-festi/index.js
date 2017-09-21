import './styles.css'

import 'components/dia-log'
import 'components/geo-select'
import React, {Component} from 'react'
import Form from 'utils/form'

export default class FormFesti extends Component {
  constructor () {
    super()
    this.state = {
      geoLocalResult: [-34.539, -58.446],
      titulo: '',
      desc: '',
      longDesc: '',
      fecha: ''
    }
    this.updateLocation = this.updateLocation.bind(this)
    this.updateTitulo = this.updateTitulo.bind(this)
    this.updateDesc = this.updateDesc.bind(this)
    this.updateLongDesc = this.updateLongDesc.bind(this)
    this.updateFecha = this.updateFecha.bind(this)
  }

  componentWillReceiveProps () {
    const festi = window.$tate('festival').value
    let loc = {}
    try {
      loc = JSON.parse(festi.locacion)
    } catch (err) {
      loc = {lat: null, lng: null}
    }
    this.setState({
      geoLocalResult: [loc.lat, loc.lng],
      titulo: festi.titulo,
      desc: festi.descripcion,
      longDesc: festi.descripcionLarga,
      fecha: festi.fecha
    })
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

  updateLongDesc (e) {
    this.setState({longDesc: e.target.value})
  }

  updateLocation (e) {
    this.setState({geoLocalResult: [
      e.currentTarget.getAttribute('lat'),
      e.currentTarget.getAttribute('lng')
    ]})
  }

  onSuccess (res) {
    window.$tate('festival').value = res
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
          action='/edit-festival'
          failAlert='true'
          successAlert='true'
          onSuccess={this.onSuccess}>
          <label className='legend'>
            Editar Festival
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
              name='descripcion'
              id='desc'
              onChange={this.updateDesc}
              value={this.state.desc} />
          </div>
          <div className='form-row-field'>
            <label htmlFor='desc'>Más info</label>
            <textarea
              name='descripcionLarga'
              id='long-desc'
              onChange={this.updateLongDesc}
              value={this.state.longDesc} />
          </div>
          <div className='form-row-field'>
            <label htmlFor='type'>Fecha</label>
            <input
              name='fecha'
              id='fecha'
              type='text'
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
              <input type='hidden' name='locacion' />
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
