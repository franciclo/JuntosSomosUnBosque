import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'

export default class FestiMarker extends Component {
  render () {
    return (
      <DivIcon {...this.props} ref={this.zIndexUp}>
        <div
          id='festi_marker'
          onClick={
            (e) => { window.$tate('popups.active').value = 'festi' }
          }>
          <span className='title'>
            Festival de plantación
            <span className='ver-mas'>
              Ver más
              <img src='caret-right.svg' title='Ver mas' />
            </span>
          </span>
          <span className='triangle'></span>
        </div>
      </DivIcon>
    )
  }
}
