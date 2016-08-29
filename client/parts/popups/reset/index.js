import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'

export default class Reset extends Component {

  render () {
    return (
      <dialog
        data-is='pop-up'
        data-open-modal={this.props.open}>
        <div>
          hola reset
        </div>
      </dialog>
    )
  }
}
