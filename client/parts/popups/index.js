import './styles.css'

import $tate from 'state-stream'
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
    $tate('popups.active').value = null
    this.activeStream = $tate('popups.active').on('E')
  }

  componentWillMount () {
    this.activeStream
      .subscribe((active) => this.setState({active}))
  }

  render () {
    var primerLogin = null
    var signin = null
    var signup = null
    var forgot = null
    var profile = null
    var reset = null

    if (window.$tate('user.primerLogin').value) {
      primerLogin = true
    }

    if (!window.$tate('user').value) {
      signin = true
      signup = true
      forgot = true
    } else {
      profile = true
    }

    if (window.$tate('user').value) {
      reset = true
    }
    return (
      <div id='popups_layout'>
        <Flyer />
        <Festi
          active={this.state.active === 'festi' ? 'active' : ''} />
        <Info
          active={this.state.active === 'info' ? 'active' : ''} />
        {signin      && <Signin
          active={this.state.active === 'signin' ? 'active' : ''} />}
        {signup      && <Signup
          active={this.state.active === 'signup' ? 'active' : ''} />}
        {forgot      && <Forgot
          active={this.state.active === 'forgot' ? 'active' : ''} />}
        {profile     && <Profile
          active={this.state.active === 'profile' ? 'active' : ''} />}
        {primerLogin && <PrimerLogin
          active={this.state.active === 'primerLogin' ? 'active' : ''} />}
        {reset       && <Reset
          active={this.state.active === 'reset' ? 'active' : ''} />}
      </div>
    )
  }
}
