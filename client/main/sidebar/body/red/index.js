import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'
import {byId as especieById} from 'utils/especies'
import tamagnoByNum from 'utils/tamagnos'

export default class Red extends Component {
  constructor () {
    super()
    this.state = {
      arboles: [],
      total: 0
    }
    this.fetchArboles = this.fetchArboles.bind(this)
  }

  componentWillMount () {
    window.$tate('especiesLoad')
      .on('E')
      .subscribe(() => { this.forceUpdate() })
    window.$tate('user.arboles')
      .on('N')
      .subscribe(() => { this.fetchArboles() })
    this.fetchArboles()
  }

  fetchArboles () {
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
                  this.state.arboles
                  .map(arbol => {
                    arbol.especieLabel = especieById(arbol.especie)
                    arbol.tamagnoLabel = tamagnoByNum(arbol.tamagno)
                    return arbol
                  })
                  .sort((a, b) => (a.especieLabel < b.especieLabel)
                    ? -1
                    : (a.especieLabel > b.especieLabel)
                      ? 1
                      : 0)
                  .map((arbol, key) => {
                    return (
                      <div
                        key={key}
                        className='item-arbol'>
                        <span className='especie'>
                          {arbol.especieLabel}
                        </span>
                        <span className='tamagno'>
                          ({arbol.tamagnoLabel})
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
