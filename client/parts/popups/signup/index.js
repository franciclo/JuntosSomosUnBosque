import './styles.css'

import 'whatwg-fetch'
import 'components/pop-up'
import React, {Component} from 'react'
import Form from '../form'

export default class Signup extends Component {
  onSuccess (res) {
    window.$tate('user').value = undefined
    window.$tate('user').value = res
    if (res.primerLogin) {
      window.$tate('popups.active').value = 'primerLogin'
    }
  }

  render () {
    return (
      <dialog
        is='pop-up'
        id='popup_signin'
        onClick={this.props.closePopUp}
        active={this.props.active}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
          &times;
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
          <div className='form-row-field regis-buttons'>
            <button
              type='button'
              className='volver-regis'
              onClick={this.props.loginShow}>
              &#8249;&nbsp;volver
            </button>
            <button
              type='submit'>
              Crear
            </button>
          </div>
        </Form>
      </dialog>
    )
  }
}
