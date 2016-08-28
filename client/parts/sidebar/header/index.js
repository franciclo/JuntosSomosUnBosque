import './styles.css'

import React, {Component} from 'react'

export default class Header extends Component {
  render () {
    return (
      <div id='sidebar_header'>
        <img src='aguarinodos.svg' />
        <div id='sidebar_header_nav'>
          <button
            onClick={
              (e) => { window.$tate('popups.active').value = 'info' }
            }>
            + info
          </button>
          |
          {
            !this.props.user &&
              <button
                onClick={
                  (e) => { window.$tate('popups.active').value = 'signin' }
                }>
                ingresar
              </button>
          }
          {
            this.props.user &&
              <button
                onClick={
                  (e) => { window.$tate('popups.active').value = 'perfil' }
                }>
                {this.props.user.nombre}
              </button>
          }
        </div>
      </div>
    )
  }
}
