import './styles.css'

import 'components/form-async'
import React, {Component} from 'react'

export default class Voluntariado extends Component {
  formDidMount (form) {
    let sendForm = form.sendForm
    form.submitStream.subscribe(sendForm)
  }

  render () {
    return (
      <article data-id='ayuda'>
        <form
          is='form-async'
          data-path='popups.list.festi.voluntariado'
          data-auto='false'
          action='/lala'
          enctype='multipart/form-data'
          class='voluntariado-form'
          ref={this.formDidMount}>
            <label htmlFor='#nombre'>Nombre</label>
            <input type='text' name='nombre' id='nombre' />
            <label htmlFor='#apellido'>Apellido</label>
            <input type='text' name='apellido' id='apellido' />
            <label htmlFor='#mail'>Mail</label>
            <input type='text' name='mail' id='mail' />
            <label htmlFor='#telefono'>Telefono</label>
            <input type='text' name='telefono' id='telefono' />
            <select name='areas'>
              <option>pre armado</option>
              <option>guardian del tiempo (orden de actividaddes)</option>
              <option>limpieza</option>
              <option>difusion</option>
              <option>proponer una mano</option>
            </select>
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
