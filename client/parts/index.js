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
      user: null,
      arboles: [],
      red: []
    }
    this.redData = window.$tate('red').on('N')
    this.userData = window.$tate('user').on(['N', 'D'])

    this.userNombreChange = window.$tate('user.nombre').on('E')
    this.userLocationChange = window.$tate('user.location').on('E')
    this.userTypeChange = window.$tate('user.type').on('E')
  }

  componentWillMount () {
    this.redData = this.redData.subscribe((data) => {
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

    this.userData = this.userData.subscribe(user => {
      if (!user) return this.setState({user: null})
      let loc
      try {
        loc = JSON.parse(user.location)
      } catch (err) {
        return this.setState({user})
      }
      user.location = loc
      this.setState({user})
    })

    this.userNombreChange.subscribe(n => {
      let user = this.state.user
      user.nombre = n
      this.setState({user})
    })
    this.userLocationChange.subscribe(n => {
      let user = this.state.user
      let loc
      try {
        loc = JSON.parse(n)
      } catch (err) {
        loc = n
      }
      user.location = loc
      this.setState({user})
    })
    this.userTypeChange.subscribe(n => {
      let user = this.state.user
      user.type = n
      this.setState({user})
    })
  }
  componentWillUnmount () {
    this.redData.unsubscribe()
    this.userData.unsubscribe()
    this.userNombreChange.unsubscribe()
    this.userLocationChange.unsubscribe()
    this.userTypeChange.unsubscribe()
  }

  componentDidMount () {
    if (this.mostrarFlyer()) {
      window.$tate('popups.active').value = 'flyer'
    }
  }

  mostrarFlyer () {
    let vistoNum = +window.localStorage.getItem('flyerFesti')
    if (!vistoNum) {
      vistoNum = 1
      window.localStorage.setItem('flyerFesti', vistoNum)
    } else {
      vistoNum++
      window.localStorage.setItem('flyerFesti', vistoNum)
    }
    return vistoNum === 1 || vistoNum === 2
      ? true
      : Math.random() >= 0.7
  }

  render () {
    return (
      <div>
        <Sidebar
          arboles={this.state.arboles}
          user={this.state.user} />
        <Mapa red={this.state.red} />
        <Popups user={this.state.user} />
      </div>
    )
  }
}
