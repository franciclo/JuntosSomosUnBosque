import './styles.css'

import 'state-stream'
import 'components/pop-up'
import React, {Component} from 'react'

export default class Signin extends Component {
  constructor () {
    super()
    this.state = {
      formAlertShow: false
    }
    this.formDidMount = this.formDidMount.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
  }

  formDidMount (form) {
    if (!form) return
    form.onResponse(res => {
      res.json().then(data => {
        if (!data.success) {
          return this.setState({formAlertShow: true})
        } else {
          window.$tate('user').value = undefined
          window.$tate('user').value = data.result
        }
      })
    })
  }

  closeAlert () {
    this.setState({formAlertShow: false})
  }

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
            action='/login'
            ref={this.formDidMount}>
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
              <dialog
                is="alert-msg"
                class='alert-login'
                active={this.state.formAlertShow ? 'active' : ''}>
                <img src="close-fff.svg" alt="Close" onClick={this.closeAlert} />
                Datos incorrectos
              </dialog>
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
                className='olvido'>
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
          </form>
        </div>
      </dialog>
    )
  }
}
