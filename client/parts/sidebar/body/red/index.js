import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'

export default class Body extends Component {
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
  }
  render () {
    let arboles = this.props.arboles
    return (
      <article data-id='action_content_red' data-enter='de-arr-s'>
        <div id='la_red'>
          <h1>Nuestros arboles</h1>
          <div id='lista_arboles_red'>
            <div id='lista_nuestros_arboles_cabecera'>
              <span>Especie/Tamaño</span>
              <span>Cantidad</span>
            </div>
            {
              Object.keys(arboles)
                .map((tipo, i) => {
                  return (
                    <div
                      key={tipo}
                      style={{background: this.rainbow(i)}}
                      className='fila-arbol'>
                      <span>{tipo.replace('-', ' ')}</span>
                      <span>{this.props.arboles[tipo]}</span>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </article>
    )
  }
}
