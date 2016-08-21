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

  activateNav (active) {
    let navs = {
      plantaciones: false,
      arbol: false,
      red: false
    }
    switch (active) {
      case 'action_content_lugar':
        navs.plantaciones = true
        break
      case 'action_content_suma':
        navs.arbol = true
        break
      case 'action_content_red':
        navs.red = true
        break
    }
    return () => {
      window.$tate('sidebar.body.active')
        .value = active
      this.setState(navs)
    }
  }

  render () {
    return (
      <div id='sidebar_nav'>
        <button
          id='sidebar_nav_plantaciones'
          className={this.state.plantaciones ? 'active' : ''}
          onClick={this.activateNav('action_content_lugar')}>
          <img src='plantaciones.svg' alt='Plantaciones' />
          Plantaciones
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_arbol'
          className={this.state.arbol ? 'active' : ''}
          onClick={this.activateNav('action_content_suma')}>
          <img src='arbol.svg' alt='Tus arboles' />
          Tus arboles
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_red'
          className={this.state.red ? 'active' : ''}
          onClick={this.activateNav('action_content_red')}>
          <span className='counter'>{this.props.total}</span>
          <img src='red.svg' alt='Arboles de la red' />
          La red
          <span className='underline'></span>
        </button>
      </div>
    )
  }
}
