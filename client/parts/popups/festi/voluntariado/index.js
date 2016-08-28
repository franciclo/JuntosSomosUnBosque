import './styles.css'

import 'components/form-async'
import 'components/alert-msg'
import React, {Component} from 'react'

export default class Voluntariado extends Component {
  constructor () {
    super()
    this.state = {
      formAlertShow: false
    }
    this.formDidMount = this.formDidMount.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
  }

  formDidMount (form) {
    form.onResponse(data => {
      data.json()
        .then(
          res => {
            console.log(res)
            if (this.state.formAlertShow) {
              return this.forceUpdate()
            }
            this.setState({formAlertShow: true})
          }
        )
    })
  }

  closeAlert (e) {
    this.setState({formAlertShow: false})
  }

  render () {
    const formAlertShow = this.state.formAlertShow ? 'active' : ''
    return (
      <article data-id='ayuda'>
        <form
          is='form-async'
          action='/voluntarios'
          enctype='multipart/form-data'
          class='voluntariado-form'
          ref={this.formDidMount}>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='#nombre'>Nombre</label>
              <input
                type='text'
                name='nombre'
                id='nombre'
                required />
            </div>
            <div className='form-field'>
              <label htmlFor='#apellido'>Apellido</label>
              <input
                type='text'
                name='apellido'
                id='apellido'
                required />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='#mail'>Mail</label>
              <input
                type='email'
                name='mail'
                id='mail'
                required />
            </div>
            <div className='form-field'>
              <label htmlFor='#telefono'>Telefono</label>
              <input
                type='text'
                name='telefono'
                id='telefono'
                required />
            </div>
          </div>
          <div className='form-row-field'>
            <label htmlFor='#areas'>¿En que nos podrías ayudar?</label>
            <select
              name='areas'
              id='areas'
              required>
              <option className='default'>Elegí un area</option>
              <option value='Pre'>Pre armado</option>
              <option value='Durante'>Durante el evento</option>
              <option value='Limpieza'>Limpieza</option>
              <option value='Difusion'>Difusión</option>
            </select>
          </div>
          <div className='form-row-field'>
            <textarea
              name='comentario'
              placeholder='Dejá un comentario...'>
            </textarea>
          </div>
          <dialog
            is='alert-msg'
            active={formAlertShow}
            class='form-alert'>
              <img src='close.svg' alt='Close' onClick={this.closeAlert} />
              <div className='volu-form-alert'>
                Gracias por sumarte, y ser parte de este festival autogestivo.
                <br />Te vamos a estar contactando via mail.
              </div>
          </dialog>
          <button type='submit'>Enviar</button>
        </form>
      </article>
    )
  }
}
