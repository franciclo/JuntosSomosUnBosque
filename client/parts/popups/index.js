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
    this.crearCuentaShow = this.crearCuentaShow.bind(this)
    this.loginShow = this.loginShow.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
  }

  componentWillMount () {
    this.activeStream = this.activeStream
      .subscribe((active) => this.setState({active}))
  }

  componentWillUnmount() {
    this.activeStream.unsubscribe()
  }

  crearCuentaShow () {
    this.setState({active: 'signup'})
  }

  loginShow () {
    this.setState({active: 'signin'})
  }

  closePopUp (e) {
    if (e.target.tagName === 'DIALOG' || ~e.target.className.indexOf('close')) {
      window.$tate('popups.active').value = null
      this.setState({active: null})
    }
  }

  render () {
    return (
      <div id='popups_layout'>
        <Flyer
          closePopUp={this.closePopUp}
          active={this.state.active === 'flyer' ? 'active' : ''} />
        <Festi
          closePopUp={this.closePopUp}
          active={this.state.active === 'festi' ? 'active' : ''} />
        <Info
          closePopUp={this.closePopUp}
          active={this.state.active === 'info' ? 'active' : ''} />
        {
          !this.props.user &&
            <Signin
              closePopUp={this.closePopUp}
              crearCuentaShow={this.crearCuentaShow}
              active={this.state.active === 'signin' ? 'active' : ''} />
        }
        {
          !this.props.user &&
            <Signup
              closePopUp={this.closePopUp}
              loginShow={this.loginShow}
              active={this.state.active === 'signup' ? 'active' : ''} />
        }
        {
          !this.props.user &&
            <Forgot
              closePopUp={this.closePopUp}
              active={this.state.active === 'forgot' ? 'active' : ''} />
        }
        {
          this.props.user &&
            <Profile
              closePopUp={this.closePopUp}
              active={this.state.active === 'profile' ? 'active' : ''} />
        }
        {
          this.props.user && this.props.user.primerLogin &&
            <PrimerLogin
              closePopUp={this.closePopUp}
              active={this.state.active === 'primerLogin' ? 'active' : ''} />
        }
        {
          this.props.user && this.props.user.reset &&
            <Reset
              closePopUp={this.closePopUp}
              active={this.state.active === 'reset' ? 'active' : ''} />
        }
      </div>
    )
  }
}
