import St from 'state'
import Rx from 'rxjs'

export default function () {
  function activateSidebarSection (active) {
    return function () {
      St('sideBar.active').value = active
    }
  }

  function init (dom) {
    var sumarTusArbolesClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="sumarTusArboles"]'),
      'click'
    )
    // var proponerUnLugarClicks = Rx.Observable.fromEvent(
    //   dom.querySelector('[data-id="proponerUnLugar"]'),
    //   'click'
    // )
    var modelInput = dom.querySelector('[data-id="model-input"]')
    this.misArboles = sumarTusArbolesClicks.subscribe(function () {
      var newInput = modelInput.cloneNode(true)
      dom.querySelector('[data-id="mis-arboles-inputs"]').appendChild(newInput)
    }
      // activateSidebarSection('mis-arboles')
    )
    var userClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="user-btn"]'),
      'click'
    )

    this.showPerfil = userClicks.subscribe(
      activateSidebarSection('perfil')
    )

    var volverAHomeClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('.volver'),
      'click'
    )

    this.volverAHome = volverAHomeClicks.subscribe(
      activateSidebarSection('mainApp')
    )

    var conocerMasClicks = Rx.Observable.fromEvent(
      dom.querySelector('[data-id="conocerMas"]'),
      'click'
    )

    conocerMasClicks.subscribe(function () {
      St('masInformacion.show').value = true
      St('masInformacion.active').value = 'masInfo'
    })

    // Home
    St('mainApp').value = {}
    St('masInfo').value = {}

    var sideBarContentMenuClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('[data-id="actionMenu"] button'),
      'click'
    )

    sideBarContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('mainApp.content').value = active
      })

    var infoContentMenuClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('#mas_info_side_menu > p'),
      'click'
    )

    infoContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('masInfo.content').value = active
      })

    var primeraVez = !!St('primeraVezBool').value
    if (primeraVez) {
      dom.querySelector('#primeraVez h1').textContent = dom.querySelector('#primeraVez h1').textContent + St('user.name').value
      Rx.Observable.fromEvent(dom.querySelector('#elegirUbicacion'), 'click')
      .subscribe(function () {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            geoSuccess(dom, position)
          }, geoError)
        } else {
          geoSuccess(dom, {coords: {latitude: -34.52, longitude: -58.446}})
        }
      })
      St('popUpBienvenido.show').value = true
      St('popUpBienvenido.active').value = 'bienvenido'
    }

    St('primeraVez.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function (v) {
        St('user.type').value = v.result.userType
        St('user.location').value = v.result.location
      })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="logout"]'), 'click')
      .subscribe(function () {
        window.location = '/logout'
      })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="evento-sidebar-mas"]'), 'click')
    .subscribe(function () {
      if (St('festival_pop.show').value) {
        St('festival_pop.show').value = false
      } else {
        dom.querySelector('.small-pop').click()
      }
    })
  }

  function destroy (s, f) {
  }

  function geoSuccess (dom, position) {
    dom.querySelector('#primeraVez [data-submit]').style.display = 'block'
    dom.querySelector('#elegirUbicacion').style.display = 'none'
    var div = dom.querySelector('#ubicacionLocalFormWelcome')
    div.style.display = 'block'
    var map = window.L.map(div).setView([position.coords.latitude, position.coords.longitude], 13)
    window.L.Icon.Default.imagePath = '/images'
    window.L.tileLayer(
      'https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
      {
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(map)
    var marker = window.L.marker([position.coords.latitude.toFixed(3), position.coords.longitude.toFixed(3)]).addTo(map)
    dom.querySelector('[data-id="locationInput"]').value = position.coords.latitude.toFixed(3) + '::' + position.coords.longitude.toFixed(3)
    map.on('click', function (ev) {
      marker.setLatLng(ev.latlng)
      dom.querySelector('[data-id="locationInput"]').value = ev.latlng.lat.toFixed(3) + '::' + ev.latlng.lng.toFixed(3)
    })
  }

  function geoError () {

  }

  return {init, destroy}
}
