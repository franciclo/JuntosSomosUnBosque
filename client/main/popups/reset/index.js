import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'
import Form from '../form'

export default class Reset extends Component {
  onSuccess (res) {
    window.location = window.location.origin
  }
  render () {
    return (
      <dia-log
        data-open-modal={this.props.open}>
        <div className='logineo reset'>
          <Form
            action='/reset'
            failAlert='true'
            onSuccess={this.onSuccess}>
            <div className='form-row-field'>
              <label htmlFor='pass1'>Nueva contraseña</label>
              <input
                id='pass1'
                name='pass'
                required
                type='password' />
            </div>
            <div className='form-row-field'>
              <label htmlFor='pass2'>Confirmar contraseña</label>
              <input
                id='pass2'
                name='passconfirm'
                type='password' />
            </div>
            <input
              type='hidden'
              name='codigo'
              defaultValue={
                window.location.search.split('=')[1]
              } />
            <button type='submit'>Enviar</button>
          </Form>
        </div>
      </dia-log>
    )
  }
}
