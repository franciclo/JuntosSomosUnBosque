import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'

export default class GetStarted extends Component {
  render () {
    return (
      <dia-log
        data-open-modal={this.props.open}
        onClick={this.props.closePopUp}>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <div className='get-started'>
          <p>Registro completado</p>
          <button
            onClick={e => {
              window.$tate('sidebar.body.active')
                      .value = 'action_content_suma'
              window.$tate('sidebar.nav.active')
                      .value = 'arbol'
              window.$tate('adminArboles').value = true
              window.$tate('popups.active').value = ''
            }}>
            Empeza a cargar tus arbolitos!
          </button>
        </div>
      </dia-log>
    )
  }
}
