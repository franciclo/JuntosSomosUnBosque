import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Signup extends Component {
  formDidMount (form) {
    if (!form) return
    form.onResponse(res => {
      res.json().then(data => {
        if (!data.success) {
          return console.error('registro fail', data)
        } else {
          window.$tate('user').value = undefined
          window.$tate('user').value = data.result
          if (data.result.primerLogin) {
            window.$tate('popups.active').value = 'primerLogin'
          }
        }
      })
    })
  }

  render () {
    return (
      <dialog
        is='pop-up'
        onClick={this.props.closePopUp}
        active={this.props.active}>
        <span
          onClick={this.props.closePopUp}
          className='close'>
          &times;
        </span>
        <div className='loguineo registrar'>
          <form
            is='form-async'
            action='/registro'
            ref={this.formDidMount}>
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
          </form>
        </div>
      </dialog>
    )
  }
}
