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
        <Header />
        <h1>JUNTOS SOMOS UN <span>BOSQUE</span></h1>
        <Nav />
        <Body />
        <Footer />
      </div>
    )
  }
}
