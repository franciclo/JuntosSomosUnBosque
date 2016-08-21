import './styles.css'

import 'components/pop-up'
import React, {Component} from 'react'

export default class PrimerLogin extends Component {

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}>
        <div>
          hola primer login
        </div>
      </dialog>
    )
  }
}
