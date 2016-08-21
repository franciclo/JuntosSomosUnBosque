import './styles.css'

import React, {Component} from 'react'

export default class Info extends Component {
  render () {
    return (
      <article data-id='introSlide' data-enter='de-izq' className='de-izq active intro-wrapper'>
        <p className='info'>Queremos motivar a las personas a ser actores de cambio para vivir en un mundo más saludable.</p>
        <p>A partir de los rituales de siembra que ofrecimos en recitales, encuentros y talleres se fue creando una gran red de cultivadores de árboles nativos y comestibles.</p>
        <p>Queremos que esos arbolitos se conviertan en un bosque. Por eso estamos organizando plantaciones colectivas, cuando los arbolitos hayan crecido y estén listos para ir a tierra.</p>
        <button data-id='verCronogramaBtn'>
          Cronograma
          <svg-icon type='caret.right'></svg-icon>
        </button>
      </article>
    )
  }
}
