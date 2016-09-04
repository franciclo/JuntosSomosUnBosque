import './styles.css'
import React, {Component} from 'react'

export default class Plantaciones extends Component {
  render () {
    return (
      <article data-id='action_content_lugar' id='evento-wrapper' className='active'>
        <div id='cartel_evento'>
          <div className='header-evento'>
            <img src='fecha.svg' alt='24 de septiembre' />
            <div className='header-evento-text'>
              <p className='info'>
                <img src='reloj.svg' alt='Hora' />
                Domingo, 12:00 am
              </p>
              <h1>Festival de plantación</h1>
            </div>
          </div>
          <p className='content-evento-text'>
            Estamos creando un Bosque comunitario junto a la Reserva Ecológica Costanera norte, en Ciudad Universitaria, lugar en emergencia ambiental y abandono estatal, donde vamos a realizar su inauguración civil.
          </p>
          <p className='bolder'>
            Traé tus arboles al festival y plantemos un bosque!
          </p>
          <button
            onClick={
              (e) => { window.$tate('popups.active').value = 'festi' }
            }
            data-id='evento-sidebar-mas'>
            Ver más
            <img src='caret-right.svg' />
          </button>
        </div>
      </article>
    )
  }
}
