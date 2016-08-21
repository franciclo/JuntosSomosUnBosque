import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'
import $tate from 'state-stream'

export default class FestiMarker extends Component {
  render () {
    return (
      <DivIcon {...this.props} ref={this.zIndexUp}>
        <div
          id='festi_marker'
          onClick={
            (e) => { $tate('popups.active').value = 'festi' }
          }>
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
