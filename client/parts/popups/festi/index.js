import './styles.css'

import 'components/pop-up'
import 'components/slider-box'
import React, {Component} from 'react'
import Info from './info'
import Crono from './crono'
import Voluntariado from './voluntariado'
export default class Festi extends Component {
  constructor () {
    super()
    this.state = {
      active: 'info'
    }
    this.activeSection = this.activeSection.bind(this)
  }

  activeSection (active) {
    return () => {
      window.$tate('popups.list.festi.content.active')
        .value = active
      this.setState({active})
    }
  }

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}
        id='popup_festi'
        data-icon='fff'>
        <div>
          <div className='header-wrapper'>
            <header>
              <img src='fecha.svg' />
              <div className='header-info'>
                <h1>Festival de plantación</h1>
                <p className='info'>
                  <img src='lugar.svg' />
                  Eco aldea Velatropa, Ciudad Universitaria.
                </p>
                <p className='info'>
                  <img src='reloj-fff.svg' />
                  Domingo 11 de septiembre, 12:00 am
                </p>
              </div>
            </header>
            <nav>
              <button
                id='popup_festi_nav_info'
                className={(this.state.active === 'info' ? 'active' : '') + ' nav'}
                onClick={this.activeSection('info')}>
                Info
                <span className='underline'></span>
              </button>
              <button
                id='popup_festi_nav_crono'
                className={(this.state.active === 'crono' ? 'active' : '') + ' nav'}
                onClick={this.activeSection('crono')}>
                Cronograma
                <span className='underline'></span>
              </button>
              <button
                id='popup_festi_nav_ayuda'
                className={(this.state.active === 'ayuda' ? 'active' : '') + ' nav'}
                onClick={this.activeSection('ayuda')}>
                Quiero ayudar
                <span className='underline'></span>
              </button>
              <a
                id='popup_festi_nav_fb'
                href='https://www.facebook.com/events/701647386601384/'
                target='_blank'>
                <img src='facebook-fff.svg' />
                Ver evento
              </a>
            </nav>
          </div>
          <slider-box
            data-path='popups.list.festi.content'>
            <Info />
            <Crono />
            <Voluntariado />
          </slider-box>
        </div>
      </dialog>
    )
  }
}
