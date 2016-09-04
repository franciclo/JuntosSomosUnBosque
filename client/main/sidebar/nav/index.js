import './styles.css'

import React, {Component} from 'react'

export default class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plantaciones: true,
      arbol: false,
      red: false,
      adminArboles: false,
      total: 0
    }
    window.$tate('total').value = 0
    window.$tate('adminArboles').value = false
    this.openAdminArboles = window.$tate('adminArboles').on('E')
    this.totalCount = window.$tate('total').on('E')
    this.activateNav = this.activateNav.bind(this)
  }

  componentWillMount () {
    this.openAdminArboles.subscribe(bool => {
      this.setState({adminArboles: bool})
    })
    this.totalCount.subscribe(total => {
      this.setState({total})
    })
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
      <div
        id='sidebar_nav'
        className={this.state.adminArboles ? 'admin-mode' : ''}>
        <button
          id='sidebar_nav_plantaciones'
          className={this.state.plantaciones ? 'active' : ''}
          onClick={this.activateNav('action_content_lugar')}>
          <img src='plantaciones.svg' alt='Plantaciones' />
          <span className='label'>Plantaciones</span>
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_arbol'
          className={this.state.arbol ? 'active' : ''}
          onClick={this.activateNav('action_content_suma')}>
          <img src='arbol.svg' alt='Mis árboles' />
          <span className='label'>Mis árboles</span>
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_red'
          className={this.state.red ? 'active' : ''}
          onClick={this.activateNav('action_content_red')}>
          <span className='counter'>{this.state.total}</span>
          <img src='red.svg' alt='Arboles de la red' />
          <span className='label'>La red</span>
          <span className='underline'></span>
        </button>
      </div>
    )
  }
}