import './styles.css'

import 'components/form-async'
import React, {Component} from 'react'

export default class Voluntariado extends Component {
  formDidMount (form) {
    let sendForm = form.sendForm
    form.onSubmit(data => {
      console.log(data)
    })
  }

  render () {
    return (
      <article data-id='ayuda'>
        <form
          is='form-async'
          action='/lala'
          enctype='multipart/form-data'
          class='voluntariado-form'
          ref={this.formDidMount}>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='#nombre'>Nombre</label>
              <input type='text' name='nombre' id='nombre' />
            </div>
            <div className='form-field'>
              <label htmlFor='#apellido'>Apellido</label>
              <input type='text' name='apellido' id='apellido' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='#mail'>Mail</label>
              <input type='text' name='mail' id='mail' />
            </div>
            <div className='form-field'>
              <label htmlFor='#telefono'>Telefono</label>
              <input type='text' name='telefono' id='telefono' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='#areas'></label>
              <select name='areas' id='areas'>
                <option>pre armado</option>
                <option>guardian del tiempo (orden de actividaddes)</option>
                <option>limpieza</option>
                <option>difusion</option>
                <option>proponer una mano</option>
              </select>
            </div>
          </div>
          <span className='hide'>
            Gracias por sumarte, y ser parte de este festival autogestivo.
            Te vamos a estar contactando via mail.
          </span>
          <button type='submit'>Send</button>
        </form>
      </article>
    )
  }
}
