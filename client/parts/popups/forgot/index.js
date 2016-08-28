import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Forgot extends Component {
  formDidMount (form) {
    if (!form) return
    form.onResponse(res => {
      res.json().then(result => {
        console.log(result)
      })
    })
  }

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}>
        <span
          onClick={this.props.closePopUp}
          className='close'>
          &times;
        </span>
        <div className='logineo forgot'>
          <form
            is='form-async'
            action='/forgot'
            ref={this.formDidMount}>
            <label className='legend'>Recuperar contraseña</label>
            <div className='form-row-field'>
              <label htmlFor='emailForgotForm'>Mail</label>
              <input id='emailForgotForm' data-label='email' data-rules='required isEmail ajaxMailExist' type='text'></input>
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
                Enviar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    )
  }
}
