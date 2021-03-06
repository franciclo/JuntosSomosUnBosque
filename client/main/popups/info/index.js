import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'

export default class Info extends Component {
  constructor () {
    super()
    this.state = {
      active: 'intro'
    }
    this.activeSection = this.activeSection.bind(this)
  }
  activeSection (active) {
    return () => {
      window.$tate('popups.list.info.content.active')
        .value = active
      this.setState({active})
    }
  }

  render () {
    return (
      <dia-log
        onClick={this.props.closePopUp}
        data-open-modal={this.props.open}
        id='popup_info'>
        <span
          onClick={this.props.closePopUp}
          className='pop-close'>
        </span>
        <div>
          <nav>
            <button
              id='popup_info_nav_intro'
              className={this.state.active === 'intro' ? 'active' : ''}
              onClick={this.activeSection('intro')}>
              Introducción
              <span className='underline'></span>
            </button>
            <button
              id='popup_info_nav_porq'
              className={this.state.active === 'porq' ? 'active' : ''}
              onClick={this.activeSection('porq')}>
              ¿Por qué?
              <span className='underline'></span>
            </button>
            <button
              id='popup_info_nav_mapa'
              className={this.state.active === 'mapa' ? 'active' : ''}
              onClick={this.activeSection('mapa')}>
              Mapa
              <span className='underline'></span>
            </button>
            <button
              id='popup_info_nav_fest'
              className={this.state.active === 'fest' ? 'active' : ''}
              onClick={this.activeSection('fest')}>
              Festivales
              <span className='underline'></span>
            </button>
          </nav>
          <slider-box data-path='popups.list.info.content'>
            <article
              id='popup_info_content_intro'
              data-id='intro'
              className='active'>
              <div className='text'>
                JUNTOS SOMOS UN BOSQUE es un proyecto de forestación colectiva. Es una red de personas que cultivan árboles nativos y comestibles, con la intención de plantarlos colectivamente creando bosques comunitarios en espacios  públicos. La red comparte conocimientos, inicia a nuevos cultivadores y autogestiona los festivales de plantación.

                "Esta semilla que crees ínfima, contiene un árbol, que contiene un bosque" Alejandro Jodorowski.
              </div>
            </article>
            <article
              id='popup_info_content_porq'
              data-id='porq'>
              <div className='text'>
                Queremos motivar a las personas a ser actores de cambio para vivir en un mundo más saludable.
                La Organización Mundial de la Salud (OMS) recomienda para las grandes ciudades entre 10 y 15 mts2 de espacios verdes por habitante. En la ciudad de Buenos Aires, tenemos 5,6  mts2 promedio. Y en los barrios más vulnerables la cifra desciende a menos de 1,5 mts2 por habitante.
                Existe un preocupación social respecto a la necesidad de tener más y mejores espacios verdes en la Ciudad. La idea es pasar de la Protesta a la Propuesta Activa. Queremos dejar de ser ciudadanos pasivos para convertirnos  en agentes activos, criadores de árboles en un balcón, patio o terraza, y plantar el cambio que queremos ver.
                Hacia una Masa Crítica de árboles nativos;
                El término “hace referencia al número de individuos involucrados en un fenómeno a partir del cual éste adquiere una dinámica propia que le permite sostenerse y crecer por sí mismo.” De esta forma buscamos consolidar una Masa Crítica de agentes activos que trabajen colaborativamente en red.
              </div>
            </article>
            <article
              id='popup_info_content_mapa'
              data-id='mapa'>
              <div className='text'>
                Este MAPA INTERACTIVO es la plataforma donde se visualiza la red. Uno puede hacerse un usuario (vivero, escuela, centro cultural, organización civil, persona) cargar los arbolitos que tiene disponibles para la red, y llevarlos a las plantaciones colectivas. De esta forma, uno puede coordinar con sus amigos más cercanos para llevar los arbolitos y herramientas para concretar la plantación. Los bosques y árboles plantados podrán ser mapeados una vez finalizado cada evento.
              </div>
            </article>
            <article
              id='popup_info_content_fest'
              data-id='fest'>
              <div className='text'>
                Los Festivales de plantación son eventos donde las personas traen sus arbolitos para plantar un bosque comunitario, en el marco de música en vivo, charlas, talleres y encuentro de redes. Luego hacemos siembras multitudinarias de árboles desde semilla, en macetitas, para que las personas se lleven, cuiden, crien y vean crecer en sus casas, hasta que estén listos para ir a tierra y plantarlos en el próximo festival. Así es como creamos un ciclo, donde en cada encuentro se siembra lo que se plantará en los próximos festivales.
              </div>
            </article>
          </slider-box>
        </div>
      </dia-log>
    )
  }
}
