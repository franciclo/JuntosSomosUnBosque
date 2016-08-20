import './styles.css'
import React, {Component} from 'react'

export default class Arboles extends Component {
  render () {
    return (
      <article data-id='action_content_suma' data-enter='de-arr-s'>
        <div id='cartel_suma'>
          <h1>Sumá tus árboles</h1>
          <p className='info'>Si estás cuidando arbolitos en maceta en tu casa y querés sumarte a las plantaciones colectivas, registralos acá y después asignalos a las plantaciónes que vos elijas.</p>
          <button id='suma_arboles_btn' className='action-button' data-id='sumarTusArboles' title='Sumate!'>
            Cargá tus primeros arbolitos
          </button>
        </div>
      </article>
    )
  }
}
