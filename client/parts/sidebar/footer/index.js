import './styles.css'

import React, {Component} from 'react'

export default class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adminArboles: false
    }
    window.$tate('adminArboles').value = false
    this.openAdminArboles = window.$tate('adminArboles').on('E')
  }

  componentWillMount () {
    this.openAdminArboles.subscribe(bool => {
      this.setState({adminArboles: bool})
    })
  }
  render () {
    return (
      <div id='sidebar_footer'>
        <img
          src='arbolitos.svg'
          className={this.state.adminArboles ? 'chico' : ''} />
        <div id='social_links'>
          <a
            href='https://github.com/franciclo/JuntosSomosUnBosque'
            target='_blank'>
            <img src='github.svg' alt='Github' />
          </a>
          <a
            href='https://www.facebook.com/juntossomosunbosque'
            target='_blank'>
            <img src='facebook.svg' alt='Facebook' />
          </a>
        </div>
      </div>
    )
  }
}
