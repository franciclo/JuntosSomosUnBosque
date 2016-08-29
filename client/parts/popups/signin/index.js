import './styles.css'

import 'state-stream'
import 'components/pop-up'
import React, {Component} from 'react'
import Form from '../form'

export default class Signin extends Component {
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
          action='login'
          onSuccess={this.onSuccess}
          failAlert='true'>
          <div className='form-row-field sociales'>
            <label className='legend'>
              Ingresar con red social
            </label>
            <a
              className='social fb'
              href='auth/facebook'>
              <img src='facebook-fff.svg' />
            </a>
            <a
              className='social tw'
              href='auth/twitter'>
              <img src='twitter.svg' />
            </a>
            <a
              className='social gl'
              href='auth/google'>
              <img src='google.svg' />
            </a>
          </div>
          <div className='form-row-field con-mail'>
            <label className='legend'>
              Ingresar con mail
            </label>
            <label
              htmlFor='mail'>
              Mail
            </label>
            <input
              name='mail'
              id='mail'
              type='email'
              required>
            </input>
          </div>
          <div className='form-row-field'>
            <label
              htmlFor='pass'>
              Contraseña
            </label>
            <input
              id='pass'
              name='pass'
              type='password'
              required>
            </input>
            <a
              data-id='forgotBtn'
              className='olvido'
              onClick={this.props.forgotShow}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className='form-row cuenta-buttons'>
            <button
              type='button'
              className='crear'
              onClick={this.props.crearCuentaShow}>
              Crear cuenta
            </button>
            <button
              type='submit'>
              Ingresar
            </button>
          </div>
        </Form>
      </dialog>
    )
  }
}
