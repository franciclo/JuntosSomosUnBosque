import './styles.css'

import React, {Component} from 'react'

export default class Info extends Component {
  render () {
    return (
      <article
        data-id='info'
        id='popup_festi_content_info'
        className='active'>
        <p>
          Vení a participar de la plantación colectiva de un Bosque, en el marco de un festival, donde habrá música, charlas, talleres y encuentro de redes.
          <br /><br />
          Te invitamos a apadrinar un árbol, trayendo tu propio arbolito nativo para plantar (más de un metro de altura). Si no contás con tu arbolito, también podés venir y nosotros te facilitamos uno para que plantes y apadrines.
          <br /><br />
          Donde plantaremos el Bosque?
          En el Parque Natural de la Reserva Ecológica Costanera Norte, detrás de Ciudad Universitaria. Este lugar fue nombrado Reserva en el 2012, y desde entonces que está totalmente abandonada. La desidia institucional a dejado en emergencia ambiental este espacio que hoy no cuenta con administración ni mantenimiento alguno. Hay incendios, basura y vandalismo. Plantando un bosque colectivamente nos manifestamos activamente para que este hermoso lugar sea conocido y disfrutado por todos.
          <br /><br />
          Entrada libre y gratuita.
        </p>
      </article>
    )
  }
}
