import '../../assets/css/general.css'
import './styles.css'
import html from './index.html'

import Page from 'page'
import 'components/svg-icon'
import 'components/form-vali'
import 'components/pop-up'
import 'components/geo-map'
import actions from './actions'

Page('reset', html, {actions})
