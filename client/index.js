import './styles.css'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Main from './main'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
// ReactDOM.render(<Main />, document.getElementById('root'))

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ'

var map = new mapboxgl.Map({
  container: 'map',
  style:
  'mapbox://styles/mapbox/outdoors-v9'
  // 'mapbox://styles/franciclo/ciunctodl002d2io4wcf9gs2p'
  // 'mapbox://styles/franciclo/cio8ufhm00023afmf9592ilip'
})

console.log(map)
