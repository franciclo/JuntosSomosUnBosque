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
import UserMail from './user-mail'
import GetStarted from './get-started'

export default class Popups extends Component {
  constructor () {
    super()
    this.state = {
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
    if (nextProps.isLogged && nextProps.primerLogin) {
      return this.setState({open: 'primerLogin'})
    }
    if (nextProps.isLogged && nextProps.reset) {
      return this.setState({open: 'reset'})
    }
    if (nextProps.isLogged && nextProps.userMail) {
      return this.setState({open: 'userMail'})
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
      this.state.open !== 'reset' &&
      this.state.open !== 'userMail' &&
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

        {/*        Content         */}

        <Festi
          closePopUp={this.closePopUp}
          open={this.state.open === 'festi' ? 'open' : ''} />
        <Info
          closePopUp={this.closePopUp}
          open={this.state.open === 'info' ? 'open' : ''} />

        {/*    User not logged actions    */}

        {
          !this.props.isLogged &&
            <Signin
              closePopUp={this.closePopUp}
              crearCuentaShow={this.activatePopUp('signup')}
              forgotShow={this.activatePopUp('forgot')}
              open={this.state.open === 'signin' ? 'open' : ''} />
        }
        {
          !this.props.isLogged &&
            <Signup
              closePopUp={this.closePopUp}
              loginShow={this.activatePopUp('signin')}
              open={this.state.open === 'signup' ? 'open' : ''} />
        }
        {
          !this.props.isLogged &&
            <Forgot
              closePopUp={this.closePopUp}
              loginShow={this.activatePopUp('signin')}
              open={this.state.open === 'forgot' ? 'open' : ''} />
        }

        {/*    User logged actions    */}

        {
          this.props.isLogged &&
            <Profile
              closePopUp={this.closePopUp}
              userType={this.props.userType}
              location={this.props.location}
              nombre={this.props.nombre}
              open={this.state.open === 'perfil' ? 'open' : ''} />
        }
        {
          this.props.isLogged && this.props.primerLogin &&
            <PrimerLogin
              open={this.state.open === 'primerLogin' ? 'open' : ''} />
        }
        {
          this.props.isLogged && this.props.reset &&
            <Reset
              open={this.state.open === 'reset' ? 'open' : ''} />
        }
        {
          this.props.isLogged && this.props.userMail &&
            <UserMail
              open={this.state.open === 'userMail' ? 'open' : ''}
              emailVerificationSent={this.props.emailVerificationSent}
              emailToVerify={this.props.emailToVerify} />
        }
        {
          this.props.isLogged &&
            <GetStarted
              open={this.state.open === 'getStarted' ? 'open' : ''} />
        }
      </div>
    )
  }
}
