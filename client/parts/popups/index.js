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
      user: null,
      open: null
    }
    window.$tate('popups.active').value = null
    this.activeStream = window.$tate('popups.active').on('E')
    this.closePopUp = this.closePopUp.bind(this)
    this.activatePopUp = this.activatePopUp.bind(this)
  }

  componentWillMount () {
    this.activeStream = this.activeStream
      .subscribe((open) => this.setState({open}))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user && nextProps.user.primerLogin) {
      this.setState({open: 'primerLogin'})
    }
  }

  componentWillUnmount () {
    this.activeStream.unsubscribe()
  }

  activatePopUp (open) {
    return () => this.setState({open})
  }

  closePopUp (e) {
    if (
      this.state.open !== 'primerLogin' &&
      e.target.id === 'popups_layout' ||
      ~e.target.className.indexOf('pop-close')
    ) {
      window.$tate('popups.active').value = null
      this.setState({open: null})
    }
  }

  render () {
    return (
      <div
        id='popups_layout'
        className={this.state.open ? 'open' : ''}
        onClick={this.closePopUp}>
        <Flyer
          closePopUp={this.closePopUp}
          open={this.state.open === 'flyer' ? 'open' : ''} />
        <Festi
          closePopUp={this.closePopUp}
          open={this.state.open === 'festi' ? 'open' : ''} />
        <Info
          closePopUp={this.closePopUp}
          open={this.state.open === 'info' ? 'open' : ''} />
        {
          !this.props.user &&
            <Signin
              closePopUp={this.closePopUp}
              crearCuentaShow={this.activatePopUp('signup')}
              forgotShow={this.activatePopUp('forgot')}
              open={this.state.open === 'signin' ? 'open' : ''} />
        }
        {
          !this.props.user &&
            <Signup
              closePopUp={this.closePopUp}
              loginShow={this.activatePopUp('signin')}
              open={this.state.open === 'signup' ? 'open' : ''} />
        }
        {
          !this.props.user &&
            <Forgot
              closePopUp={this.closePopUp}
              loginShow={this.activatePopUp('signin')}
              open={this.state.open === 'forgot' ? 'open' : ''} />
        }
        {
          this.props.user &&
            <Profile
              closePopUp={this.closePopUp}
              user={this.props.user}
              open={this.state.open === 'perfil' ? 'open' : ''} />
        }
        {
          this.props.user && this.props.user.primerLogin &&
            <PrimerLogin
              open={this.state.open === 'primerLogin' ? 'open' : ''} />
        }
        {
          this.props.user && this.props.user.reset &&
            <Reset
              closePopUp={this.closePopUp}
              open={this.state.open === 'reset' ? 'open' : ''} />
        }
      </div>
    )
  }
}
