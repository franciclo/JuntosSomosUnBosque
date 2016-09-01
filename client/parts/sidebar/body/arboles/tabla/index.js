import './styles.css'
import React, {Component} from 'react'
import Form from '../../../../popups/form'

export default class TablaArboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 0,
      showSubmit: false
    }
  }
  componentWillReceiveProps (nextProps) {
    var arbolesCantidad = []
    for (var arbol in nextProps.arboles) {
      arbolesCantidad.push(nextProps.arboles[arbol].cantidad)
    }
    var total = arbolesCantidad
      .reduce((a, b) => a + b, 0)
    this.setState({total})
  }

  render () {
    return (
      <div id='lista-arboles'>
        <Form
          prevent='prevent'>
          {
            this.props.arboles &&
            (
              <div className='tabla-header'>
                <div className='total'>
                  Total: {this.state.total}
                </div>
                <button
                  type='submit'
                  className={!this.state.showSubmit ? 'hide' : ''}>
                </button>
              </div>
            )
          }
          <div className='tabla-arboles'>
            {
              this.props.arboles && this.props.arboles.map(arbol => {
                return (
                  <div className='item-arbol'>
                    <span className='arbol-especie'>
                      {arbol.especie}
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
                      defaultValue={arbol.cantidad} />
                  </div>
                )
              })
            }
          </div>
        </Form>
        {
          !this.props.arboles &&
          (
            <div className='sin-arboles'>
              No tenés árboles registrados
            </div>
          )
        }
      </div>
    )
  }
}
