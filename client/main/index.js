import './styles.css'

import 'state-stream'
import React, {Component} from 'react'
import {makeRequest as makeRequestEspecies} from 'utils/get-especies'
import Mapa from './mapa'
import Sidebar from './sidebar'
import Popups from './popups'

export default class Main extends Component {
  constructor () {
    super()
    this.state = {
      isLogged: null,
      nombre: null,
      primerLogin: null,
      reset: null,
      userMail: null,
      emailVerificationSent: null,
      emailToVerify: null,
      userType: null,
      location: null,
      arboles: null
    }
    window.$tate('especiesLoad').value = false
  }

  componentWillMount () {
    makeRequestEspecies()
      .then(() => {
        window.$tate('especiesLoad').value = true
      })
    window.$tate('user')
      .on(['N', 'D'])
      .subscribe(user => {
        if (!user) {
          return this.setState({
            isLogged: false,
            nombre: null,
            userType: null,
            location: null,
            arboles: null
          })
        }
        if (user.primerLogin) {
          return this.setState({
            isLogged: true,
            nombre: user.nombre,
            primerLogin: true
          })
        }
        if (user.reset) {
          return this.setState({
            isLogged: true,
            nombre: user.nombre,
            reset: true
          })
        }
        if (user.emailVerified === false) {
          return this.setState({
            isLogged: true,
            nombre: user.nombre,
            userMail: true,
            emailVerificationSent: user.emailVerificationSent,
            emailToVerify: user.emailToVerify || ''
          })
        }
        this.setState({
          isLogged: true,
          nombre: user.nombre,
          userType: user.userType,
          location: user.location && JSON.parse(user.location),
          arboles: user.arboles
        })
      })

    window.$tate('user.nombre')
      .on('E')
      .subscribe(nombre => {
        this.setState({nombre})
      })

    window.$tate('user.primerLogin')
      .on('E')
      .subscribe(primerLogin => {
        this.setState({primerLogin})
      })

    window.$tate('user.userType')
      .on(['E', 'N'])
      .subscribe(userType => {
        this.setState({userType})
      })

    window.$tate('user.location')
      .on(['E', 'N'])
      .subscribe(location => {
        location = JSON.parse(location)
        this.setState({location})
      })

    window.$tate('user.arboles')
      .on('N')
      .subscribe(arboles => {
        this.setState({arboles})
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

  render () {
    return (
      <div>
        <Sidebar
          isLogged={this.state.isLogged}
          arboles={this.state.arboles}
          nombre={this.state.nombre} />
        <Mapa />
        <Popups
          isLogged={this.state.isLogged}
          userType={this.state.userType}
          location={this.state.location}
          nombre={this.state.nombre}
          primerLogin={this.state.primerLogin}
          reset={this.state.reset}
          userMail={this.state.userMail}
          emailVerificationSent={this.state.emailVerificationSent}
          emailToVerify={this.state.emailToVerify} />
      </div>
    )
  }
}
