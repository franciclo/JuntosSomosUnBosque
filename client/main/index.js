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
      especies: []
    }
    this.especieById = this.especieById.bind(this)
  }

  componentWillMount () {
    window.$tate('user')
      .on(['N', 'D'])
      .subscribe(user => {
        if (!user) return this.setState({user: null})
        user.location = JSON.parse(user.location)
        this.setState({user})
      })

    window.$tate('user.nombre')
      .on('E')
      .subscribe(n => {
        let user = this.state.user
        user.nombre = n
        this.setState({user})
      })

    window.$tate('user.location')
      .on('E')
      .subscribe(n => {
        let user = this.state.user
        user.location = JSON.parse(n)
        this.setState({user})
      })

    window.$tate('user.type')
      .on('E')
      .subscribe(n => {
        let user = this.state.user
        user.type = n
        this.setState({user})
      })

    window.fetch('/especies')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success) {
          this.setState({especies: res.result})
        } else {
          console.log('error al pedir las especies', res)
        }
      })
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

  especieById (id) {
    let especieI = this.state.especies
      .map(e => e.id)
      .indexOf(id)
    if (!~especieI) return 'Especie desconocida'
    return this.state.especies[especieI].label
  }

  render () {
    return (
      <div>
        <Sidebar
          especies={this.state.especies}
          especieById={this.especieById}
          user={this.state.user} />
        <Mapa
          especieById={this.especieById} />
        <Popups
          user={this.state.user} />
      </div>
    )
  }
}
