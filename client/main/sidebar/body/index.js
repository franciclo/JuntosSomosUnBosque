import './styles.css'
import 'components/slider-box'
import React, {Component} from 'react'
import Plantaciones from './plantaciones'
import Arboles from './arboles'
import Red from './red'
export default class Body extends Component {
  render () {
    return (
      <slider-box
        data-path='sidebar.body'
        id='sidebar_body'>
        <Plantaciones />
        <Arboles {...this.props} />
        <Red especieById={this.props.especieById} />
      </slider-box>
    )
  }
}
