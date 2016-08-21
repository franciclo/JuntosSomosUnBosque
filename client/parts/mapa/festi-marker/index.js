import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'

export default class FestiMarker extends Component {
  zIndexUp (ref) {
    // debugger
  }
  render () {
    return (
      <DivIcon {...this.props} ref={this.zIndexUp}>
        <div id='festi_marker'>
          <img src='fecha.svg' alt='24 de Septiembre' />
          <span className='title'>Festival de plantación</span>
          <span className='ver-mas'>
            Ver más
            <img src='caret-right.svg' alt='Ver mas' />
          </span>
          <span className='triangle'></span>
        </div>
      </DivIcon>
    )
  }
}
