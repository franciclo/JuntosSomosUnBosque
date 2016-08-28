import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Flyer extends Component {
  render () {
    return (
      <dialog
        id='festi_flyer'
        is='pop-up'
        onClick={this.props.closePopUp}
        active={this.props.active ? 'active' : ''}>
        <span
          onClick={this.props.closePopUp}
          className='close'>
          &times;
        </span>
        <img src='flyer.svg' />
      </dialog>
    )
  }
}
