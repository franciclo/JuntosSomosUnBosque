import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'

export default class UserMarker extends Component {
  render () {
    let tipoLabel = (() => {
      switch (this.props.user.tipo) {
        case 'per':
          return 'Persona'
        case 'viv':
          return 'Vivero'
        case 'org':
          return 'Organización Civíl'
        case 'esc':
          return 'Escuela'
        case 'cul':
          return 'Centro Cultural'
        default:
          return 'Persona'
      }
    })()
    return (
      <DivIcon {...this.props}>
        <div className='user_marker'>
          <img
            src='per.svg'
            alt={tipoLabel} />
          <span className='counter'>{this.props.user.arboles}</span>
        </div>
      </DivIcon>
    )
  }
}
