import './styles.css'
import React, {Component} from 'react'
import Form from '../../../../popups/form'

export default class FormArboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rangeLabel: 'Brote'
    }
    this.changeRange = this.changeRange.bind(this)
  }

  componentWillMount () {
    window.$tate('sidebar.body.active')
      .on('E')
      .subscribe((b) => {
        window.$tate('adminArboles').value = false
      })
  }

  changeRange (e) {
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

  agregarArbol (data) {
    let misArboles = window.$tate('user.arboles').value
    let miArbolI = misArboles
      .map(a => a.especie + a.tamagno)
      .indexOf(data.get('especie') + data.get('tamagno'))
    if (~miArbolI) {
      misArboles[miArbolI].cantidad += +data.get('cantidad')
    } else {
      misArboles.push({
        tamagno: data.get('tamagno'),
        cantidad: +data.get('cantidad'),
        especie: data.get('especie')
      })
    }
    window.$tate('user.arboles').value = undefined
    window.$tate('user.arboles').value = misArboles
  }

  render () {
    return (
      <div id='admin-arboles'>
        <span
          className='close'
          onClick={this.closeAdmin}>
        </span>
        <Form
          onSubmit={this.agregarArbol}
          prevent='prevent'>
          <div className='form-row-field'>
            <label htmlFor='#especie'>Especie</label>
            <select
              name='especie'
              id='especie'
              required>
              <option
                className='default'
                value=''>
                Elegí una especie
              </option>
              {
                this.props.especies.map((especie, key) => {
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
                onChange={this.changeRange}
                required />
            </div>
            <div className='form-field cantidad'>
              <label htmlFor='#cantidad'>Cantidad</label>
              <input
                type='number'
                name='cantidad'
                id='cantidad'
                min='1'
                required />
            </div>
            <div className='form-field submit-btn'>
              <button
                type='submit'
                title='Agregar'>
                +
              </button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
