import './styles.css'
import React, {Component} from 'react'
import FormArboles from './form'
import TablaArboles from './tabla'

export default class Arboles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      adminArboles: false,
      arboles: [],
      cantidades: [],
      showSubmit: false
    }
    window.$tate('adminArboles').value = false
    this.openAdminArboles = window.$tate('adminArboles').on('E')
    this.changeCantidad = this.changeCantidad.bind(this)
    this.arbolesSaved = this.arbolesSaved.bind(this)
    this.sumarArbol = this.sumarArbol.bind(this)
  }

  componentWillMount () {
    this.openAdminArboles.subscribe(bool => {
      this.setState({adminArboles: bool})
    })
  }

  componentWillUnmount () {
    this.openAdminArboles.unsubscribe()
  }

  componentWillReceiveProps (props) {
    if (props.arboles && props.arboles.length > 0) {
      this.setState({
        arboles: props.arboles,
        cantidades: props.arboles.map(a => a.cantidad)
      })
    }
  }

  sumarArbol (data) {
    const tamagno = data.get('tamagno')
    const cantidad = +data.get('cantidad')
    const especie = data.get('especie')
    const arboles = this.state.arboles
    const cantidades = this.state.cantidades
    const arbolI = arboles
      .map(a => [a.especie, a.tamagno].join(''))
      .indexOf([especie, tamagno].join(''))
    if (~arbolI) {
      cantidades[arbolI] = +cantidades[arbolI] + +cantidad
    } else {
      arboles.push({
        especie: especie,
        tamagno: tamagno
      })
      cantidades.push(cantidad)
    }
    this.setState({arboles, cantidades, showSubmit: true})
  }

  changeCantidad (e) {
    let key = +e.target.getAttribute('data-key')
    let cantidades = this.state.cantidades
    cantidades[key] = e.target.value
    this.setState({cantidades, showSubmit: true})
  }

  arbolesSaved (res) {
    console.log(res)
    this.setState({showSubmit: false})
    window.$tate('user.arboles').value = undefined
    window.$tate('user.arboles').value = res
  }

  render () {
    console.log('this.props.isLogged', this.props.isLogged)
    console.log('this.state.adminArboles', this.state.adminArboles)
    console.log('this.props.arboles', this.props.arboles)
    console.log('-------------------------------------')
    return (
      <article
        id='tus-arboles'
        data-id='action_content_suma'>
        {
          !this.state.adminArboles &&
          (
            !this.props.isLogged ||
            (
              !this.props.arboles ||
              this.props.arboles.length === 0)
            ) &&
          (
            <div id='cartel_suma'>
              <h1>Sumá tus árboles</h1>
              <p className='info'>
                Si estás cuidando arbolitos nativos y/o comestibles en maceta en tu casa y querés sumarte a las plantaciones colectivas, registralos para sumarte a la red.
              </p>
              <button
                onClick={(e) => {
                  if (this.props.isLogged) {
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
          this.props.isLogged &&
          this.state.adminArboles &&
          (
            <FormArboles
              sumarArbol={this.sumarArbol} />
          )
        }
        {
          this.props.isLogged &&
          (this.state.adminArboles || (this.props.arboles && this.props.arboles.length > 0)) &&
          (
            <TablaArboles
              changeCantidad={this.changeCantidad}
              arbolesSaved={this.arbolesSaved}
              arboles={this.state.arboles}
              cantidades={this.state.cantidades}
              showSubmit={this.state.showSubmit}
              showAdmin={!this.state.adminArboles} />
          )
        }
      </article>
    )
  }
}
