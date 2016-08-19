import './styles.css'

import 'state-stream'
import React, {Component} from 'react'
import Mapa from './mapa'
import Sidebar from './sidebar'
import Popups from './popups'

export default class Main extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        <Mapa />
        <Popups />
      </div>
    )
  }
}
