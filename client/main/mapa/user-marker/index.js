import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'

export default class UserMarker extends Component {
  render () {
    return (
      <DivIcon {...this.props}>
        <div className='user_marker'>
          <img
            src={this.props.user.userType + '.svg'} />
          <span className='counter'>
            {
              this.props.user.arboles
                .reduce((acc, a) => acc + a.cantidad, 0)
            }
          </span>
        </div>
      </DivIcon>
    )
  }
}
