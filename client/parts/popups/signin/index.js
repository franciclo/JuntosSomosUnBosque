import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Signin extends Component {

  render () {
    return (
      <dialog
        id='popup_signin'
        is='pop-up'
        active={this.props.active}>
        <div
          className='loguineo'>
          <form
            is='form-async'
            id='loginForm'
            direction='login'
            ajax='false'>
            <div className='form-row-field sociales'>
              <label className='legend'>
                Ingresar usando una red social
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
                Ingreso con mail
              </label>
              <label
                htmlFor='emailLoginForm'>
                Mail
              </label>
              <input
                id='emailLoginForm'
                data-label='email'
                data-rules='required isEmail ajaxMailExist'
                type='text'>
              </input>
            </div>
            <div className='form-row-field'>
              <label
                htmlFor='passLoginForm'
                data-rules='required'>
                Contraseña
              </label>
              <input
                id='passLoginForm'
                data-label='password'
                type='password'>
              </input>
              <a
                data-id='forgotBtn'
                className='olvido'>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className='form-row cuenta-buttons'>
              <button
                className='crear'>
                Crear cuenta
              </button>
              <button
                type='submit'>
                Ingresar
              </button>
              
            </div>
          </form>
        </div>
      </dialog>
    )
  }
}
