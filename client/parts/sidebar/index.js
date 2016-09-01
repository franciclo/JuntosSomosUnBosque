import './styles.css'

import React, {Component} from 'react'
import Header from './header'
import Nav from './nav'
import Body from './body'
import Footer from './footer'

export default class Sidebar extends Component {
  render () {
    return (
      <div id='sidebar'>
        <Header
          user={this.props.user} />
        <h1>JUNTOS SOMOS UN <span>BOSQUE</span></h1>
        <Nav
          total={
            this.props.arboles
              .reduce((acc, arbol) => {
                return arbol.cantidad + acc
              }, 0)
          } />
        <Body
          arboles={this.props.arboles}
          user={this.props.user} />
        <Footer />
      </div>
    )
  }
}
