import './styles.css'
import React, {Component} from 'react'
import {all as allEspecies} from 'utils/get-especies'
import Form from '../../../../popups/form'

export default class FormArboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      especie: null,
      tamagno: null,
      cantidad: null,
      rangeLabel: 'Brote'
    }
    this.changeTamagno = this.changeTamagno.bind(this)
    this.changeEspecie = this.changeEspecie.bind(this)
    this.changeCantidad = this.changeCantidad.bind(this)
  }

  componentWillMount () {
    window.$tate('sidebar.body.active')
      .on('E')
      .subscribe((b) => {
        window.$tate('adminArboles').value = false
      })
  }

  changeTamagno (e) {
    let label = ''
    switch (e.target.value) {
      case '1':
        label = 'Brote'
        break
      case '2':
        label = 'Chico'
        break
      case '3':
        label = 'Mediano'
        break
      case '4':
        label = 'Maduro'
        break
      case '5':
        label = 'Grande'
        break
    }
    this.setState({rangeLabel: label})
  }

  closeAdmin () {
    window.$tate('adminArboles').value = false
  }

  sumarArbol () {
    let arbol = {
      especie: this.state.especie,
      tamagno: this.state.tamagno,
      cantidad: this.state.cantidad
    }
    this.props.sumarArbol(arbol)
  }

  render () {
    return (
      <div id='admin-arboles'>
        <span
          className='close'
          onClick={this.closeAdmin}>
        </span>
        <Form
          prevent='prevent'>
          <div className='form-row-field'>
            <label htmlFor='#especie'>Especie</label>
            <select
              name='especie'
              id='especie'
              onChange={this.changeEspecie}
              required>
              <option
                className='default'
                value=''>
                Elegí una especie
              </option>
              {
                allEspecies()
                  .map((especie, key) => {
                    return <option
                      key={key}
                      value={especie.id}>
                      {especie.label}
                    </option>
                  })
              }
            </select>
          </div>
          <div className='form-row'>
            <div className='form-field tamagno'>
              <label htmlFor='#tamagno'>
                Tamaño
                <span className='tamagno-label'>
                  {this.state.rangeLabel}
                </span>
              </label>
              <input
                type='range'
                name='tamagno'
                id='tamagno'
                min='1'
                max='5'
                step='1'
                defaultValue='1'
                onChange={this.changeTamagno}
                required />
            </div>
            <div className='form-field cantidad'>
              <label htmlFor='#cantidad'>Cantidad</label>
              <input
                type='number'
                name='cantidad'
                id='cantidad'
                min='1'
                max='10000'
                onChange={this.changeCantidad}
                required />
            </div>
            <div className='form-field submit-btn'>
              <button
                type='submit'
                title='Agregar'
                onClick={this.sumarArbol}>
                +
              </button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
