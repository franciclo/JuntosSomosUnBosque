import './styles.css'

import React, {Component} from 'react'

export default class Header extends Component {
  clickMasInfo (e) {
    console.log('click mas info sidebar header')
  }

  clickIngresar (e) {
    console.log('click ingresar')
  }

  render () {
    return (
      <div id='sidebar_header'>
        <img src='aguarinodos.svg' />
        <div id='sidebar_header_nav'>
          <button
            onClick={this.clickMasInfo}>
            + info
          </button>
          |
          <button
            onClick={this.clickIngresar}>
            ingresar
          </button>
        </div>
      </div>
    )
  }
}
