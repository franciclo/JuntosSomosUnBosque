import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Signup extends Component {

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}>
        <div className='loguineo'>
          <h1>Nueva cuenta</h1>
          <a className='social fb' href='auth/facebook'>
            <svg-icon type='social.facebook'></svg-icon>
            Registrate con Facebook
          </a>
          <a className='social tw' href='auth/twitter'>
            <svg-icon type='social.twitter'></svg-icon>
            Registrate con Twitter
          </a>
          <a className='social gl' href='auth/google'>
            <svg-icon type='social.google'></svg-icon>
            Registrate con Google
          </a>
          <form-vali
            id='signupForm'
            direction='signup'>
            <p className='info'>o creá una cuenta con tu mail</p>
            <label htmlFor='nameSignupForm'>Nombre</label>
            <input id='nameSignupForm' data-label='name' data-rules='required' type='text'></input>
            <label htmlFor='emailSignupForm'>Mail</label>
            <input id='emailSignupForm' data-label='email' data-rules='required isEmail ajaxMailDontExist' type='text'></input>
            <label htmlFor='passSignupForm'>Nueva contraseña</label>
            <input id='passSignupForm' data-label='password' data-rules='required' type='password'></input>
            <a data-id='volverLoginRegis' className='registrate'>Ir a inicio de sesión</a>
            <button type='submit'>Registrar</button>
          </form-vali>
        </div>
      </dialog>
    )
  }
}
