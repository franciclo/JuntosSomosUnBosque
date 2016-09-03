import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'
import {byId as especieById} from 'utils/get-especies'
export default class Red extends Component {
  constructor () {
    super()
    this.state = {
      arboles: []
    }
  }

  componentWillMount () {
    window.fetch('/arboles')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success) {
          this.setState({arboles: res.result})
        } else {
          console.log('error al pedir los arboles', res)
        }
      })
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
              this.state.arboles
                .map((arbol, i) => {
                  return (
                    <div
                      key={i}
                      className='fila-arbol'>
                      <span>{especieById(arbol.especie)}</span>
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
