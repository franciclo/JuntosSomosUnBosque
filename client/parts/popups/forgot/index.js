import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'
import Form from '../form'

export default class Forgot extends Component {
  render () {
    return (
      <dia-log
        data-open-modal={this.props.open}
        onClick={this.props.closePopUp}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <div className='logineo forgot'>
          <Form
            action='/forgot'
            failAlert='true'
            successAlert='true'>
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
          </Form>
        </div>
      </dia-log>
    )
  }
}
