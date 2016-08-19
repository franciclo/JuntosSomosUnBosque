import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'
import FestiMarker from './festi-marker'

export default class FestiIcon extends Component {
  render () {
    return (
      <DivIcon {...this.props}>
        <FestiMarker />
      </DivIcon>
    )
  }
}
