import './styles.css'

import React, {Component} from 'react'
import Signin from './signin'
import Signup from './signup'
import Forgot from './forgot'
import Profile from './profile'
import PrimerLogin from './primer-login'
import Reset from './reset'
import Flyer from './flyer'
import Festi from './festi'
import Info from './info'

export default class Popups extends Component {
  constructor () {
    super()
    this.state = {
      active: null
    }
    window.$tate('popups.active').value = null
    this.activeStream = window.$tate('popups.active').on('E')
    this.user = window.$tate('user').value
    this.crearCuentaShow = this.crearCuentaShow.bind(this)
  }

  componentWillMount () {
    this.activeStream
      .subscribe((active) => this.setState({active}))
  }

  crearCuentaShow () {
    this.setState({active: 'signup'})
  }

  render () {
    let user = this.user
    return (
      <div id='popups_layout'>
        <Flyer />
        <Festi
          active={this.state.active === 'festi' ? 'active' : ''} />
        <Info
          active={this.state.active === 'info' ? 'active' : ''} />
        {!user && <Signin
          crearCuentaShow={this.crearCuentaShow}
          active={this.state.active === 'signin' ? 'active' : ''} />}
        {!user && <Signup
          active={this.state.active === 'signup' ? 'active' : ''} />}
        {!user && <Forgot
          active={this.state.active === 'forgot' ? 'active' : ''} />}
        {user && <Profile
          active={this.state.active === 'profile' ? 'active' : ''} />}
        {user && user.primerLogin && <PrimerLogin
          active={this.state.active === 'primerLogin' ? 'active' : ''} />}
        {user && user.reset && <Reset
          active={this.state.active === 'reset' ? 'active' : ''} />}
      </div>
    )
  }
}
