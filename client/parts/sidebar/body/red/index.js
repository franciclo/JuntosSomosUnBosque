import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'

export default class Body extends Component {
  render () {
    return (
      <article data-id='action_content_red' data-enter='de-arr-s'>
        <div id='la_red'>
          <h1>Nuestros arboles</h1>
          <div id='lista_arboles_red'>
            <div id='lista_nuestros_arboles_cabecera'>
              <span>Especie/Tamaño</span>
              <span>Cantidad</span>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
