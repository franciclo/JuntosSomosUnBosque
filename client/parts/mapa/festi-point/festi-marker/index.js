import './styles.css'

import React, {Component} from 'react'

export default class FestiMarker extends Component {
  render () {
    return (
      <div id='festi_marker'>
        <img src='fecha.svg' alt='24 de Septiembre' />
        <span className='title'>Festival de plantación</span>
        <span className='ver-mas'>
          <img src='caret-right.svg' alt='Ver mas' />
        </span>
        <span className='triangle'></span>
      </div>
    )
  }
}
