import './styles.css'

import React, {Component} from 'react'

export default class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adminArboles: false,
      total: 0,
      active: 'red'
    }
    window.$tate('total').value = 0
    window.$tate('adminArboles').value = false
    window.$tate('sidebar.nav.active').value = ''
    this.openAdminArboles = window.$tate('adminArboles').on('E')
    this.totalCount = window.$tate('total').on('E')
    this.navActives = window.$tate('sidebar.nav.active').on(['E', 'N'])
    this.activateNav = this.activateNav.bind(this)
  }

  componentWillMount () {
    this.openAdminArboles.subscribe(bool => {
      this.setState({adminArboles: bool})
    })
    this.totalCount.subscribe(total => {
      this.setState({total})
    })
    this.navActives.subscribe(active => { this.setState({active}) })
  }

  activateNav (active) {
    let nav = ''
    switch (active) {
      case 'action_content_lugar':
        nav = 'plantaciones'
        break
      case 'action_content_suma':
        nav = 'arbol'
        break
      case 'action_content_red':
        nav = 'red'
        break
    }
    return () => {
      window.$tate('sidebar.body.active')
        .value = active
      this.setState({active: nav})
    }
  }

  render () {
    return (
      <div
        id='sidebar_nav'
        className={this.state.adminArboles ? 'admin-mode' : ''}>
        <button
          id='sidebar_nav_plantaciones'
          className={this.state.active === 'plantaciones' ? 'active' : ''}
          onClick={this.activateNav('action_content_lugar')}>
          <img src='plantaciones.svg' alt='Plantaciones' />
          <span className='label'>Plantaciones</span>
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_arbol'
          className={this.state.active === 'arbol' ? 'active' : ''}
          onClick={this.activateNav('action_content_suma')}>
          <img src='arbol.svg' alt='Mis árboles' />
          <span className='label'>Mis árboles</span>
          <span className='underline'></span>
        </button>
        <button
          id='sidebar_nav_red'
          className={this.state.active === 'red' ? 'active' : ''}
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
