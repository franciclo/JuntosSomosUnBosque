import './styles.css'

import React, {Component} from 'react'

export default class Crono extends Component {
  render () {
    return (
      <article data-id='cronoSlide' data-enter='de-der' className='cronograma-wrapper'>
        <button id='volver_a_intro' data-id='volverAIntro'>
          <svg-icon type='caret.left'></svg-icon>
          volver
        </button>
        <div className='fila-crono'>
          <span className='hora-crono'>12:00</span>
          <span className='linea-crono'></span>
          <div className='content-crono'>
            <h2>Nos juntamos</h2>
            <p>Empezamos con una pequeña reunion para contabilizar los arboles y organizar la jornada.</p>
          </div>
        </div>
        <div className='fila-crono'>
          <span className='hora-crono'>12:30</span>
          <span className='linea-crono'></span>
          <div className='content-crono'>
            <h2>Charla</h2>
            <p>El colectivo huertero nos explicará como podemos tomar acción en comunidad.</p>
          </div>
        </div>
        <div className='fila-crono'>
          <span className='hora-crono'>13:00</span>
          <span className='linea-crono'></span>
          <div className='content-crono'>
            <h2>Musica</h2>
            <p>Perota Chingo estara tocando y al final haremos una siembra colectiva.</p>
          </div>
        </div>
        <div className='fila-crono'>
          <span className='hora-crono'>15:00</span>
          <span className='linea-crono'></span>
          <div className='content-crono'>
            <h2>Plantación</h2>
            <p>Ahora si! a laburar!</p>
          </div>
        </div>
      </article>
    )
  }
}
