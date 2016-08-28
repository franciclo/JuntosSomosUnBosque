import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Flyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  mostrarFlyer (vistoNum) {
    if (!vistoNum) {
      vistoNum = 1
      localStorage.setItem('flyerFesti', vistoNum)
    } else {
      vistoNum++
      localStorage.setItem('flyerFesti', vistoNum)
    }
    return vistoNum === 1 || vistoNum === 2
      ? true
      : Math.random() >= 0.7
  }

  componentDidMount() {
    let vistos = +localStorage.getItem('flyerFesti')
    this.setState({
      active: this.mostrarFlyer(vistos)
    })
  }

  render () {
    return (
      <dialog
        id='festi_flyer'
        is='pop-up'
        onClick={this.props.closePopUp}
        active={this.state.active ? 'active' : ''}>
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
