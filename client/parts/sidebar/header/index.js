import './styles.css'

import React, {Component} from 'react'
import $tate from 'state-stream'

export default class Header extends Component {
  render () {
    return (
      <div id='sidebar_header'>
        <img src='aguarinodos.svg' />
        <div id='sidebar_header_nav'>
          <button
            onClick={
              (e) => { $tate('popups.active').value = 'info' }
            }>
            + info
          </button>
          |
          <button
            onClick={
              (e) => { $tate('popups.active').value = 'signin' }
            }>
            ingresar
          </button>
        </div>
      </div>
    )
  }
}
