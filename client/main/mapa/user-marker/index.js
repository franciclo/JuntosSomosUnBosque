import './styles.css'

import React, {Component} from 'react'
import DivIcon from 'react-leaflet-div-icon'
import userTypes from 'utils/user-types'
import tamagnoByNum from 'utils/tamagnos'
import {byId as especieById} from 'utils/especies'

export default class UserMarker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: null
    }
    this.pop = window.$tate('map.popups.active').on(['E', 'N'])
    this.showPopup = this.showPopup.bind(this)
  }

  componentWillMount () {
    this.pop.subscribe(id => {
      this.setState({active: id === this.props.user.id})
    })
  }

  showPopup () {
    window.$tate('map.popups.active').value = this.props.user.id
  }

  render () {
    return (
      <DivIcon {...this.props}>
        <div
          className='user_marker'>
          <img
            onClick={this.showPopup}
            src={this.props.user.userType + '.svg'}
            title={
              userTypes(this.props.user.userType)
            } />
          <span
            className='counter'
            onClick={this.showPopup}>
            {
              this.props.user.arboles
                .reduce((acc, a) => acc + a.cantidad, 0)
            }
          </span>
          <div className={'user_popup ' + (this.state.active ? 'active' : '')}>
            <h1>{this.props.user.nombre}</h1>
            <p>{userTypes(this.props.user.userType)}</p>
            <div className='tabla-arboles'>
            {
              this.props.user.arboles.map((arbol, key) => {
                return (
                  <div
                    key={key}
                    className='item-arbol'>
                    <span className='especie'>
                      {especieById(arbol.especie)}
                    </span>
                    <span className='tamagno'>
                      ({tamagnoByNum(arbol.tamagno)})
                    </span>
                    <span className='cantidad'>
                      {arbol.cantidad}
                    </span>
                  </div>
                )
              })
            }
            </div>
            <span className="triangle"></span>
          </div>
        </div>
      </DivIcon>
    )
  }
}
