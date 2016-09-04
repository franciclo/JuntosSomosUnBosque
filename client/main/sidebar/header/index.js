import './styles.css'

import 'components/drop-down'
import 'whatwg-fetch'
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
            !this.props.nombre &&
              <button
                onClick={
                  (e) => { window.$tate('popups.active').value = 'signin' }
                }>
                Ingresar
              </button>
          }
          {
            this.props.nombre &&
              <drop-down>
                {this.props.nombre}
                <dia-log>
                  <button
                    onClick={e => {
                      window.$tate('popups.active').value = 'perfil'
                    }}>
                    Perfil
                  </button>
                  <button
                    onClick={e => {
                      window.fetch('/logout',
                        {
                          credentials: 'same-origin',
                          method: 'post'
                        })
                        .then(res => {
                          res.json().then(result => {
                            if (result.success) {
                              window.$tate('user').value = undefined
                            } else {
                              console.warn(result)
                            }
                          })
                        })
                        .catch(err => { console.warn(err) })
                    }}>
                    Salir
                  </button>
                </dia-log>
              </drop-down>
          }
        </div>
      </div>
    )
  }
}
