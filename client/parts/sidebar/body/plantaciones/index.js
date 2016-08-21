import './styles.css'
import React, {Component} from 'react'
import $tate from 'state-stream'

export default class Plantaciones extends Component {
  render () {
    return (
      <article data-id='action_content_lugar' data-enter='de-arr-s' className='de-arr-s active'>
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
            Estamos co-creando un Bosque mediante siembras y plantaciones colectivas en festivales y eventos, a través de una red de personas que cultivan arbolitos en sus casas.
          </p>
          <p className='bolder'>
            Podes traer tus arboles al festival y entre musica y charlas, plantaremos un bosque!
          </p>
          <button
            onClick={
              (e) => { $tate('popups.active').value = 'festi' }
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
