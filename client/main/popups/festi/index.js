import './styles.css'

import 'components/dia-log'
import 'components/slider-box'
import React, {Component} from 'react'
import Info from './info'
import Crono from './crono'
import Voluntariado from './voluntariado'
export default class Festi extends Component {
  constructor () {
    super()
    this.state = {
      active: 'info',
      festi: null
    }
    this.activeSection = this.activeSection.bind(this)
  }

  componentDidMount() {
    window.$tate('festival')
      .on(['N', 'E'])
      .subscribe(festival => {
        this.setState({ festi: festival })
      })
  }

  activeSection (active) {
    return () => {
      window.$tate('popups.list.festi.content.active')
        .value = active
      this.setState({active})
    }
  }

  render () {
    if (!this.state.festi) return null
    return (
      <dia-log
        data-open-modal={this.props.open}
        id='popup_festi'
        onClick={this.props.closePopUp}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <div>
          <div className='header-wrapper'>
            <header>
              <div className='header-info'>
                <h1>{this.state.festi.titulo}</h1>
                {
                // <p className='info'>
                //   <img src='lugar.svg' />
                //   Reserva Ecológica Costanera Norte, acceso Puente FADU, Ciudad Universitaria.
                // </p>
                }
                <p className='info'>
                  <img src='reloj-fff.svg' />
                  {this.state.festi.fecha}
                </p>
              </div>
            </header>
            {
            // <nav>
            //   <button
            //     id='popup_festi_nav_info'
            //     className={(this.state.active === 'info' ? 'active' : '') + ' nav'}
            //     onClick={this.activeSection('info')}>
            //     Info
            //     <span className='underline'></span>
            //   </button>
            //   <button
            //     id='popup_festi_nav_crono'
            //     className={(this.state.active === 'crono' ? 'active' : '') + ' nav hide'}
            //     onClick={this.activeSection('crono')}>
            //     Cronograma
            //     <span className='underline'></span>
            //   </button>
            //   <button
            //     id='popup_festi_nav_ayuda'
            //     className={(this.state.active === 'ayuda' ? 'active' : '') + ' nav'}
            //     onClick={this.activeSection('ayuda')}>
            //     Quiero ayudar
            //     <span className='underline'></span>
            //   </button>
            //   <a
            //     id='popup_festi_nav_fb'
            //     href='https://www.facebook.com/events/701647386601384/'
            //     target='_blank'>
            //     <img src='facebook-fff.svg' />
            //     Ver evento
            //   </a>
            // </nav>
          }
          </div>
          {
          // <slider-box
          //   data-path='popups.list.festi.content'>
          //   <Info />
          //   <Crono />
          //   <Voluntariado />
          // </slider-box>
          }
          <article
            data-id='info'
            id='popup_festi_content_info'
            className='active'>
            <p>
              {this.state.festi.descripcionLarga}
            </p>
          </article>
        </div>
      </dia-log>
    )
  }
}
