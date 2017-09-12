import './styles.css'
import React, {Component} from 'react'

export default class Plantaciones extends Component {
  constructor (props) {
    super(props)
    this.state = {
      festival: null
    }
  }

  componentWillMount () {
    if (!window.$tate('festivales').value) {
      this.fetchFestivales()
    }
  }

  fetchFestivales () {
    window.fetch('/festivales')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.success) {
          this.setState({festival: res.result})
          window.$tate('festival').value = res.result
        } else {
          console.warn('error al pedir el festi', res)
        }
      })
  }

  render () {
    const user = window.$tate('user').value
    const festi = this.state.festival
    return (
      <article data-id='action_content_lugar' id='evento-wrapper'>
        {user && user.isAdmin && (<button
          id='agregar-festi-btn'
          onClick={
            (e) => { window.$tate('popups.active').value = 'nuevoFesti' }
          }>
          Editar festi
        </button>)}
        {festi && (
          <div id='cartel_evento'>
            <div className='header-evento'>
              <div className='header-evento-text'>
                <p className='info'>
                  <img src='reloj.svg' alt='Hora' />
                  {festi.fecha}
                </p>
                <h1>{festi.titulo}</h1>
              </div>
            </div>
            <p className='content-evento-text'>
              {festi.descripcion}
            </p>
            <button
              onClick={
                (e) => { window.$tate('popups.active').value = `festi:${festi._id}` }
              }
              data-id='evento-sidebar-mas'>
              Ver más
              <img src='caret-right.svg' />
            </button>
          </div>
        )}
      </article>
    )
  }
}

// <div id='cartel_evento'>
//   <div className='header-evento'>
//     <img src='fecha.svg' alt='24 de septiembre' />
//     <div className='header-evento-text'>
//       <p className='info'>
//         <img src='reloj.svg' alt='Hora' />
//         Sábado 24  y Domingo 25 de Septiembre.
//       </p>
//       <h1>Festival de plantación</h1>
//     </div>
//   </div>
//   <p className='content-evento-text'>
//     Estamos creando un Bosque comunitario junto a la Reserva Ecológica Costanera norte, en Ciudad Universitaria, lugar en emergencia ambiental y abandono estatal, donde vamos a realizar su inauguración civil.
//   </p>
//   <p className='bolder'>
//     ¡Traé tus arboles al festival y plantemos un bosque!
//   </p>
//   <button
//     onClick={
//       (e) => { window.$tate('popups.active').value = 'festi' }
//     }
//     data-id='evento-sidebar-mas'>
//     Ver más
//     <img src='caret-right.svg' />
//   </button>
// </div>
