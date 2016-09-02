import './styles.css'
import React, {Component} from 'react'
import Form from '../../../../popups/form'

export default class TablaArboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSubmit: false,
      arboles: []
    }
  }
  componentWillMount () {
    window.$tate('user.arboles')
      .on('N')
      .subscribe(arboles => {
        console.log(arboles)
        this.setState({arboles, showSubmit: true})
        this.forceUpdate()
      })
  }
  tamagnoByNum (n) {
    let label = ''
    switch (n) {
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
    return label
  }
  rainbow (k) {
    let colors = [
      '#2bd873',
      '#5fedd5',
      '#009aff',
      '#153add',
      '#ff3642',
      '#ff687b',
      '#ec9c55'
    ]
    return colors[(colors.length - 1) < k ? 0 : k]
    // style={{
    //   background: this.rainbow(key)
    // }}
  }
  render () {
    return (
      <div
        id='lista-arboles'
        className={this.state.arboles.length === 0 ? 'sin-arboles' : ''}>
        {
          this.props.showAdmin &&
          (
            <div className='tabla-header'>
              <button
                onClick={
                  e => {
                    window.$tate('adminArboles').value = true
                  }
                }>
                Cargar arboles
              </button>
            </div>
          )
        }
        {
          this.state.arboles.length > 0 &&
          (
            <Form
              prevent='prevent'>
              <div className='tabla-arboles'>
                {
                  this.state.arboles.map((arbol, key) => {
                    return (
                      <div
                        key={key}
                        className='item-arbol'>
                        <span className='especie'>
                          {this.props.especieById(arbol.especie)}
                        </span>
                        <span className='tamagno'>
                          ({this.tamagnoByNum(arbol.tamagno)})
                        </span>
                        <input
                          type='hidden'
                          name='tamagno'
                          defaultValue={arbol.tamagno} />
                        <input
                          type='hidden'
                          name='especie'
                          defaultValue={arbol.especie} />
                        <input
                          type='number'
                          onChange={e => { this.setState({showSubmit: true}) }}
                          defaultValue={arbol.cantidad} />
                      </div>
                    )
                  })
                }
              </div>
              <div className='tabla-footer'>
                <div className='total'>
                  Total: {
                    this.state.arboles
                      .reduce((acc, arbol) => {
                        return acc + arbol.cantidad
                      }, 0)
                  }
                </div>
                <button
                  type='submit'
                  className={!this.state.showSubmit ? 'hide' : ''}>
                  Guardar cambios
                </button>
              </div>
            </Form>
          )
        }
        {
          this.state.arboles.length === 0 &&
          (
            <span className='sin-arboles-label'>
              No tenés árboles registrados
            </span>
          )
        }
      </div>
    )
  }
}
