import './styles.css'

import React, {Component} from 'react'
import {Popup} from 'react-leaflet'
import Info from './info'
import Crono from './crono'

export default class FestiPop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    window.$tate('map.festi.show').value = false

    this.festiToggles = window.$tate('map.festi.show').on(['E'])
    this.fuck = this.fuck.bind(this)
  }

  componentWillMount () {
    this.festiToggles.subscribe((bool) => {
      this.setState({show: bool})
    })
  }
  componentWillUnmount () {
    this.festiToggles.unsubscribe()
  }

  fuck (ref) {
    this.festiToggles
      .filter((b) => b)
      .subscribe(function () {
        // ref.leafletElement.update()
      })
  }
  render () {
    return (
      <Popup
        {...this.props}
        closeOnClick={false}
        closeButton={false}
        className='festi-popup'
        ref={this.fuck}>
        <div
          id='festi_pop'
          className={this.state.show ? 'active' : ''}>
          <header>
            <img src='close.svg' />
            <h1>Festival de plantación</h1>
            <p className='info'>
              <img src='lugar.svg' />
              Eco aldea Velatropa, Ciudad Universitaria.
            </p>
            <p className='info'>
              <img src='reloj.svg' />
              Domingo 11 de septiembre, 12:00 am
            </p>
          </header>
          <slider-box data-path='map.festi.content' id='eventoPopContent'>
            <Info />
            <Crono />
          </slider-box>
        </div>
      </Popup>
    )
  }
}
