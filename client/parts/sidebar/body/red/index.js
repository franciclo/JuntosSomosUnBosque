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
    return (
      <article data-id='action_content_red'>
        <div id='la_red'>
          <h1>Nuestros arboles</h1>
          <div id='lista_arboles_red'>
            <div id='lista_nuestros_arboles_cabecera'>
              <span>Especie/Tamaño</span>
              <span>Cantidad</span>
            </div>
            {
              this.props.arboles
                .map((arbol, i) => {
                  return (
                    <div
                      key={i}
                      style={{background: this.rainbow(i)}}
                      className='fila-arbol'>
                      <span>{arbol.label}</span>
                      <span>{arbol.cantidad}</span>
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
