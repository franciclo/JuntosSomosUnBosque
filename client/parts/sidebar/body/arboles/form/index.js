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
              required>
              <option className='default'>Elegí una especie</option>
              <option value='Agu'>Aguaribay</option>
              <option value='Alg'>Algarrobo</option>
              <option value='Cha'>Chañar</option>
              <option value='Cor'>Coronillo</option>
              <option value='Esp'>Espinillo</option>
              <option value='Sen'>Sen de Campo</option>
              <option value='Som'>Sombra de Toro</option>
              <option value='Tal'>Tala</option>
              <option value='Alg'>Algodonillo</option>
              <option value='Ana'>Anacahuita</option>
              <option value='Azo'>Azota Caballo</option>
              <option value='Bla'>Blanquillo</option>
              <option value='Bug'>Bugre</option>
              <option value='Can'>Canelón</option>
              <option value='Car'>Carpinchera</option>
              <option value='Cei'>Ceibo</option>
              <option value='Cha'>Chal Chal</option>
              <option value='Cur'>Curupí</option>
              <option value='Dur'>Durasznillo Blanco</option>
              <option value='Flo'>Flor de Seda</option>
              <option value='Fum'>Fumo Bravo</option>
              <option value='Hig'>Higuerón</option>
              <option value='Ing'>Ingá</option>
              <option value='Lau'>Laurel Criollo</option>
              <option value='Mat'>Mata Ojo</option>
              <option value='Mur'>Murta</option>
              <option value='Omb'>Ombú</option>
              <option value='Pal'>Palo Amarillo</option>
              <option value='Pin'>Pindó</option>
              <option value='Ram'>Rama Negra</option>
              <option value='Ros'>Rosa de Río</option>
              <option value='Sal'>Salvia Azul</option>
              <option value='Sar'>Sarandí Blanco</option>
              <option value='Sar'>Sarandí Colorado</option>
              <option value='Sau'>Sauce Criollo</option>
              <option value='Sau'>Sauco</option>
              <option value='Tar'>Tarumá</option>
              <option value='Tas'>Tasi</option>
              <option value='Tem'>Tembetarí</option>
              <option value='Tim'>Timbó</option>
              <option value='Bar'>Barba de Chivo</option>
              <option value='Car'>Carquejilla</option>
              <option value='Cei'>Ceibillo</option>
              <option value='Hed'>Hediondillo</option>
              <option value='Lan'>Lantana</option>
              <option value='Mal'>Malva Blanca</option>
              <option value='Mal'>Malva de Monte</option>
              <option value='Mal'>Malvavisco</option>
              <option value='Mol'>Molle</option>
              <option value='Pav'>Pavonia</option>
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
            <div className='form-field'>
              <label htmlFor='#cantidad'>Cantidad</label>
              <input
                type='number'
                name='cantidad'
                id='cantidad'
                min='1'
                required />
            </div>
          </div>
          <div className='form-row-field'>
            <button>Agregar</button>
          </div>
        </Form>
      </div>
    )
  }
}
