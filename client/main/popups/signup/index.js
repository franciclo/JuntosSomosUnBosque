import './styles.css'

import 'whatwg-fetch'
import 'components/dia-log'
import React, {Component} from 'react'
import Form from '../form'

export default class Signup extends Component {
  onSuccess (res) {
    window.$tate('user').value = {
      nombre: res,
      primerLogin: true
    }
  }

  render () {
    return (
      <dia-log
        id='popup_signup'
        onClick={this.props.closePopUp}
        data-open-modal={this.props.open}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <Form
          action='/registro'
          onSuccess={this.onSuccess}
          failAlert='true'>
          <label className='legend'>Nueva cuenta</label>
          <div className='form-row-field'>
            <label
              htmlFor='name_registro'>
              Nombre
            </label>
            <input
              id='name_registro'
              name='name'
              type='text'
              required />
          </div>
          <div className='form-row-field'>
            <label
              htmlFor='email_registro'>
              Mail
            </label>
            <input
              id='email_registro'
              name='email'
              type='text'
              required />
          </div>
          <div className='form-row-field'>
            <label
              htmlFor='password_registro'>
              Contraseña
            </label>
            <input
              id='password_registro'
              name='password'
              type='password'
              required />
          </div>
          <div className='form-row-field foot-buttons'>
            <button
              type='button'
              className='back'
              onClick={this.props.loginShow}>
              &#8249;&nbsp;volver
            </button>
            <button
              type='submit'>
              Crear
            </button>
          </div>
        </Form>
      </dia-log>
    )
  }
}
