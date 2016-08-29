import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'

export default class Profile extends Component {

  render () {
    return (
      <dialog
        data-is='pop-up'
        data-open-modal={this.props.open}>
        <div>
          hola profile
        </div>
      </dialog>
    )
  }
}
