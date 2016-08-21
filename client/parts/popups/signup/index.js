import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class Signup extends Component {

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}>
        <div>
          hola signup
        </div>
      </dialog>
    )
  }
}
