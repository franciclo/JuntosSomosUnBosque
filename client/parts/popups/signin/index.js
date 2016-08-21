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
        <article className='loguineo'>
          <h1>Inicio de sesión</h1>
          <a
            className='social fb'
            href='auth/facebook'>
            <img src='facebook.svg' />
            Ingresar con Facebook
          </a>
          <a
            className='social tw'
            href='auth/twitter'>
            <img src='twitter.svg' />
            Ingresar con Twitter
          </a>
          <a
            className='social gl'
            href='auth/google'>
            <img src='google.svg' />
            Ingresar con Google
          </a>
          <form-vali
            id='loginForm'
            direction='login'
            ajax='false'>
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
              className='registrate'>
              ¿Olvidaste tu contraseña?
            </a>
            <a
              data-id='registrarse'
              className='registrate'>
              ¿Querés crear una cuenta?
            </a>
            <button
              data-submit
              data-label-active='Ingresando'>
              Ingresar
            </button>
          </form-vali>
        </article>
      </dialog>
    )
  }
}
