import './styles.css'

import 'components/slider-box'
import 'components/pop-up'
import React, {Component} from 'react'
import Info from './info'
import Crono from './crono'
export default class Festi extends Component {

  render () {
    return (
      <dialog is='pop-up' data-path='festi'>
        <div
          id='festi_pop'>
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
          <slider-box data-path='festi' id='eventoPopContent'>
            <Info />
            <Crono />
          </slider-box>
        </div>
      </dialog>
    )
  }
}
