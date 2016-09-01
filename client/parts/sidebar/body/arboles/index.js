import './styles.css'
import React, {Component} from 'react'
import FormArboles from './form'
import TablaArboles from './tabla'

export default class Arboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adminArboles: false
    }
    window.$tate('adminArboles').value = false
    this.openAdminArboles = window.$tate('adminArboles').on('E')
  }

  componentWillMount () {
    this.openAdminArboles.subscribe(bool => {
      this.setState({adminArboles: bool})
    })
  }

  componentWillUnmount () {
    this.openAdminArboles.unsubscribe()
  }

  render () {
    return (
      <article
        id='tus-arboles'
        data-id='action_content_suma'>
        {
          !this.state.adminArboles &&
          (!this.props.user || this.props.user.arboles.length === 0) &&
          (
            <div id='cartel_suma'>
              <h1>Sumá tus árboles</h1>
              <p className='info'>
                Si estás cuidando arbolitos nativos y/o comestibles en maceta en tu casa y querés sumarte a las plantaciones colectivas, registralos para sumarte a la red.
              </p>
              <button
                onClick={(e) => {
                  if (this.props.user) {
                    window.$tate('adminArboles').value = true
                  } else {
                    window.$tate('popups.active').value = 'signin'
                  }
                }}
                id='suma_arboles_btn'
                className='action-button'
                data-id='sumarTusArboles'
                title='Sumate!'>
                Cargá tus primeros arbolitos
              </button>
            </div>
          )
        }
        {
          this.props.user &&
          this.state.adminArboles &&
          (
            <FormArboles user={this.props.user} />
          )
        }
        {
          this.props.user &&
          (this.state.adminArboles || this.props.user.arboles.length > 0) &&
          (
            <TablaArboles user={this.props.user} />
          )
        }
      </article>
    )
  }
}
