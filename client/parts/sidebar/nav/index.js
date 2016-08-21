import './styles.css'

import React, {Component} from 'react'

export default class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plantaciones: true,
      arbol: false,
      red: false
    }
    this.activateNav = this.activateNav.bind(this)
  }

  renderCantidadTotal (dom, arboles) {
    var arbolesCantidad = []
    for (var arbol in arboles) {
      arbolesCantidad.push(arboles[arbol].cantidad)
    }
    var cantidadTotal = arbolesCantidad
      .reduce((a, b) => a + b, 0)
    dom.querySelector('#home_sidebar .logo svg-icon .count').textContent = cantidadTotal
  }

  activateNav (e) {
    let navs = {
      plantaciones: false,
      arbol: false,
      red: false
    }
    let active = e.currentTarget.id
    switch (active) {
      case 'sidebar_nav_plantaciones':
        navs.plantaciones = true
        window.$tate('sidebar.body.active')
          .value = 'action_content_lugar'
        break
      case 'sidebar_nav_arbol':
        navs.arbol = true
        window.$tate('sidebar.body.active')
          .value = 'action_content_suma'
        break
      case 'sidebar_nav_red':
        navs.red = true
        window.$tate('sidebar.body.active')
          .value = 'action_content_red'
        break
    }
    this.setState(navs)
  }

  render () {
    return (
      <div id='sidebar_nav'>
        <button
          id='sidebar_nav_plantaciones'
          className={this.state.plantaciones ? 'active' : ''}
          onClick={this.activateNav}>
          <img src='plantaciones.svg' alt='Plantaciones' />
          Plantaciones
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_arbol'
          className={this.state.arbol ? 'active' : ''}
          onClick={this.activateNav}>
          <img src='arbol.svg' alt='Tus arboles' />
          Tus arboles
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_red'
          className={this.state.red ? 'active' : ''}
          onClick={this.activateNav}>
          <span className='counter'>{this.props.total}</span>
          <img src='red.svg' alt='Arboles de la red' />
          La red
          <span className='underline'></span>
        </button>
      </div>
    )
  }
}
