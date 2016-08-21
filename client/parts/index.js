import './styles.css'

import 'state-stream'
import React, {Component} from 'react'
import Mapa from './mapa'
import Sidebar from './sidebar'
import Popups from './popups'

export default class Main extends Component {
  constructor () {
    super()
    this.state = {
      arboles: [],
      red: []
    }
    this.redData = window.$tate('red').on('N')
  }

  componentWillMount () {
    this.redData.subscribe((data) => {
      let arboles = data
        .map((usu) => usu.arboles || [])
        .reduce((acc, arboles) => {
          arboles.forEach(function (arbol) {
            let label = arbol.especie + ' ' + arbol.tamagno
            let ind = acc.map((a) => a.label).indexOf(label)
            if (~ind) {
              acc[ind].cantidad += arbol.cantidad
            } else {
              acc.push({
                cantidad: arbol.cantidad,
                label: label
              })
            }
          })
          return acc
        }, [])
        .sort((a, b) => {
          return b.cantidad - a.cantidad
        })

      let red = data
        .map((user) => {
          user.arboles = user.arboles
            .reduce((acc, arbol) => {
              return arbol.cantidad + acc
            }, 0)
          return user
        })
      this.setState({
        arboles,
        red
      })
    })
  }
  render () {
    return (
      <div>
        <Sidebar arboles={this.state.arboles} />
        <Mapa red={this.state.red} />
        <Popups />
      </div>
    )
  }
}
