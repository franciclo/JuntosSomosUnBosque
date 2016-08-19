import './styles.css'

import React, {Component} from 'react'

export default class Footer extends Component {
  render () {
    return (
      <div id='sidebar_footer'>
        <img src='arbolitos.svg' />
        <div id='social_links'>
          <a
            href='https://github.com/franciclo/JuntosSomosUnBosque'
            target='_blank'>
            <img src='github.svg' alt='Github' />
          </a>
          <a
            href='https://www.facebook.com/juntossomosunbosque'
            target='_blank'>
            <img src='facebook.svg' alt='Facebook' />
          </a>
        </div>
      </div>
    )
  }
}
