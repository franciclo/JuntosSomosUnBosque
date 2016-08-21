import './styles.css'

import 'components/pop-up'
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
      $tate('popups.list.info.content.active')
        .value = active
      this.setState({active})
    }
  }

  render () {
    return (
      <dialog
        is='pop-up'
        active={this.props.active}
        id='popup_info'>
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
              <div className="text">
                En los distintos rituales de siembra que oficiamos en recitales, encuentros y talleres sembramos miles de arbolitos, creando una gran red de cultivadores de arbolitos nativos.<br /><br />
                Hoy, estos miles de seres crecen en muchas casas de la ciudad, y con este evento tenemos la intención de encausar toda esta energía viva.<br /><br />
                Queremos que esos arbolitos se conviertan en un bosque. Por eso estamos organizando una plantada colectiva dentro de un año, cuando los arbolitos crezcan y estén listos para ir a tierra.<br /><br />
                La idea es que entre todos nos ayudemos; compartiendo experiencias, dudas, consejos sobre como cuidar los arbolitos y más que nada conociéndonos. Cada tanto haremos un encuentro para compartir y pasarla bien, con música, árboles, arte y alegría.<br /><br />
                Juntos, somos un BOSQUE.
              </div>
            </article>
            <article
              id='popup_info_content_porq'
              data-id='porq'>
              <div className="text">
                Queremos motivar a las personas a ser actores de cambio para vivir en un mundo más saludable.<br />
                La OMS propone entre 10 y 15 mts2 de espacios verdes por habitante. Al día de hoy, en Capital Federal, tenemos 6,2 mts2 promedio. Y en los barrios vulnerable esa cifra desciende a 1,5 mts2 por habitante.<br /><br />

                De Protesta a Propuesta Activa<br />
                Existe un preocupación social respecto a la necesidad de tener más y mejores espacios verdes en la Ciudad. Proponemos convertir al ciudadano pasivo en un agente activo, en un criador de árboles en su balcón, patio, ventana o terraza.<br />
                Así se genera una relación Ganar-Ganar-Ganar:<br />
                Gana el Ciudadano: Cambia su actitud y se involucra en los temas que le importan y con el espacio público que lo rodea.<br />
                Gana el Municipio: obtiene nuevos espacios verdes con una alta participación comunitaria y una reducción muy significativa en costos (en 2013 se pagaban $900 pesos por árbol plantado, de esta forma serían producidos por la comunidad).<br />
                Gana el Ecosistema del que formamos parte al haber nuevo refugio y alimento para la fauna local. (Persona-Comunidad-Planeta)<br /><br />

                Hacia una Masa Crítica de árboles nativos<br />
                El término “hace referencia al número de individuos involucrados en un fenómeno a partir del cual éste adquiere una dinámica propia que le permite sostenerse y crecer por sí mismo.”<br />
                A febrero de 2016 llevamos sembrados más de 10.000 árboles y esta cifra crece semana a semana.
              </div>
            </article>
            <article
              id='popup_info_content_mapa'
              data-id='mapa'>
              <div className="text">
                En los distintos rituales de siembra que oficiamos en recitales, encuentros y talleres sembramos miles de arbolitos, creando una gran red de cultivadores de arbolitos nativos.<br /><br />
                Hoy, estos miles de seres crecen en muchas casas de la ciudad, y con este evento tenemos la intención de encausar toda esta energía viva.<br /><br />
                Queremos que esos arbolitos se conviertan en un bosque. Por eso estamos organizando una plantada colectiva dentro de un año, cuando los arbolitos crezcan y estén listos para ir a tierra.<br /><br />
                La idea es que entre todos nos ayudemos; compartiendo experiencias, dudas, consejos sobre como cuidar los arbolitos y más que nada conociéndonos. Cada tanto haremos un encuentro para compartir y pasarla bien, con música, árboles, arte y alegría.<br /><br />
                Juntos, somos un BOSQUE.
              </div>
            </article>
            <article
              id='popup_info_content_fest'
              data-id='fest'>
              <div className="text">
                En los distintos rituales de siembra que oficiamos en recitales, encuentros y talleres sembramos miles de arbolitos, creando una gran red de cultivadores de arbolitos nativos.<br /><br />
                Hoy, estos miles de seres crecen en muchas casas de la ciudad, y con este evento tenemos la intención de encausar toda esta energía viva.<br /><br />
                Queremos que esos arbolitos se conviertan en un bosque. Por eso estamos organizando una plantada colectiva dentro de un año, cuando los arbolitos crezcan y estén listos para ir a tierra.<br /><br />
                La idea es que entre todos nos ayudemos; compartiendo experiencias, dudas, consejos sobre como cuidar los arbolitos y más que nada conociéndonos. Cada tanto haremos un encuentro para compartir y pasarla bien, con música, árboles, arte y alegría.<br /><br />
                Juntos, somos un BOSQUE.
              </div>
            </article>
          </slider-box>
        </div>
      </dialog>
    )
  }
}
