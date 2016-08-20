import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'
import FestiMarker from './festi-marker'
import FestiPop from './festi-pop'

export default class FestiIcon extends Component {
  render () {
    return (
      <DivIcon {...this.props}>
        <div>
          <FestiMarker />
          <FestiPop />
        </div>
      </DivIcon>
    )
  }
}
