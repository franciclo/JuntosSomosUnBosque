import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'
import {byId as especieById} from 'utils/get-especies'
export default class Red extends Component {
  constructor () {
    super()
    this.state = {
      arboles: [],
      total: 0
    }
  }

  componentWillMount () {
    window.fetch('/arboles')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success) {
          let total = res.result
            .reduce((acc, a) => {
              return acc + a.cantidad
            }, 0)
          window.$tate('total').value = total
          this.setState({arboles: res.result, total})
        } else {
          console.warn('error al pedir los arboles', res)
        }
      })
  }
  render () {
    return (
      <article
        data-id='action_content_red'
        id='lista-red'>
        <div className='tabla-header'>
          <h1>Árboles de la red</h1>
        </div>
        {
          this.state.arboles.length > 0 &&
          (
            <div className='tabla-arboles-wrapper'>
              <div className='tabla-arboles'>
                {
                  this.state.arboles.map((arbol, key) => {
                    return (
                      <div
                        key={key}
                        className='item-arbol'>
                        <span className='especie'>
                          {especieById(arbol.especie)}
                        </span>
                        <span className='cantidad'>
                          {arbol.cantidad}
                        </span>
                      </div>
                    )
                  })
                }
              </div>
              <div className='tabla-footer'>
                <div className='total'>
                  Total: {this.state.total}
                </div>
              </div>
            </div>
          )
        }
      </article>
    )
  }
}
