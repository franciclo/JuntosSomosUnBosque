import './styles.css'

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
    form.onResponse(res => {
      res.json().then(data => {
        if (!data.success) {
          console.log('onResponsefail', data)
          return this.setState({formAlertShow: true})
        }
        console.log('onResponse', data)
      })
    })
    form.onSubmit(v => { console.log('onSubmit', v) })
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
                htmlFor='pass'
                required>
                Contraseña
              </label>
              <input
                id='pass'
                name='pass'
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
                type='button'
                className='crear'
                onClick={this.props.crearCuentaShow}>
                Crear cuenta
              </button>
              <button>
                Ingresar
              </button>
              
            </div>
          </form>
        </div>
      </dialog>
    )
  }
}
