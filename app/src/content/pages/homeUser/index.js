import '../../assets/css/general.css'
import './styles.css'

import 'icons/user.svg'
import 'icons/plantin.svg'
import 'icons/lugar.svg'
import 'icons/info.svg'
import 'icons/calendar.svg'
import 'icons/calendar.11.svg'
import 'icons/reloj.svg'
import 'icons/arrow.left.svg'
import 'icons/social.facebook.svg'
import 'icons/social.twitter.svg'
import 'icons/social.google.svg'
import 'icons/caret.right.svg'
import 'icons/plantin.solo.svg'
import 'icons/plantines.svg'
import 'icons/plantines2.svg'
import 'icons/github.svg'
import 'icons/salir.svg'
import 'icons/triangle.svg'
import 'icons/guardar.svg'

import html from './index.html'

import Page from 'page'
import 'components/svg-icon'
import 'components/form-vali'
import 'components/pop-up'
import 'components/h-tabs'
import 'components/side-bar'
import 'components/geo-map'
import 'components/drop-down'
import 'components/arbol-fila'
import actions from './actions'
import renders from './renders'

Page('home', html, {actions, renders})
