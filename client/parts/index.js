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
      arboles: {},
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
            let subTotal = arbol.especie + '-' + arbol.tamagno
            acc[subTotal] = acc[subTotal]
              ? acc[subTotal] + arbol.cantidad
              : arbol.cantidad
          })
          return acc
        }, {})

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
