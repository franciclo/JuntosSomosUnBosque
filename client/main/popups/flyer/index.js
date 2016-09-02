import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'

export default class Flyer extends Component {
  render () {
    return (
      <dia-log
        id='festi_flyer'
        onClick={this.props.closePopUp}
        data-open-modal={this.props.open}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <img src='flyer.svg' />
      </dia-log>
    )
  }
}
