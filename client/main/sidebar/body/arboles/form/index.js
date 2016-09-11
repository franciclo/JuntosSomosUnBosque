import './styles.css'
import React, {Component} from 'react'
import {all as allEspecies} from 'utils/especies'
import Form from 'utils/form'
import tamagnoByNum from 'utils/tamagnos'

export default class FormArboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      especie: null,
      tamagno: '1',
      cantidad: null,
      rangeLabel: 'Brote'
    }
    this.changeTamagno = this.changeTamagno.bind(this)
    this.changeEspecie = this.changeEspecie.bind(this)
    this.changeCantidad = this.changeCantidad.bind(this)
    this.sumarArbol = this.sumarArbol.bind(this)
  }

  componentWillMount () {
    window.$tate('sidebar.body.active')
      .on('E')
      .subscribe((b) => {
        window.$tate('adminArboles').value = false
      })
  }

  changeTamagno (e) {
    let label = tamagnoByNum(e.target.value)
    this.setState({rangeLabel: label, tamagno: e.target.value})
  }

  changeEspecie (e) {
    this.setState({especie: e.target.value})
  }

  changeCantidad (e) {
    this.setState({cantidad: e.target.value})
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
          prevent='prevent'
          onSubmit={this.sumarArbol}>
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
              <optgroup label='Nativos'>
                {
                  allEspecies()
                    .filter(e => e.tipo === 'nativo')
                    .map((especie, key) => {
                      return <option
                        key={key}
                        value={especie.id}>
                        {especie.label}&nbsp;&nbsp;({especie.latin})
                      </option>
                    })
                }
              </optgroup>
              <optgroup label='Comestibles'>
                {
                  allEspecies()
                    .filter(e => e.tipo === 'comestible')
                    .map((especie, key) => {
                      return <option
                        key={key}
                        value={especie.id}>
                        {especie.label}
                      </option>
                    })
                }
              </optgroup>
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
                title='Agregar'>
                Agregar
              </button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
