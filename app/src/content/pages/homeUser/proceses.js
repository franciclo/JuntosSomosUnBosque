import St from 'state'
import { DOM as Dom$ } from 'rx-dom'

module.exports = function (dom) {
  function activateSidebarSection (active) {
    return function () {
      St('sideBar.active').value = active
    }
  }

  function init () {
    var sumarTusArbolesClicks = Dom$.click(
      dom.querySelector('[data-id="sumarTusArboles"]')
    )
    // var proponerUnLugarClicks = Dom$.click(
    //   dom.querySelector('[data-id="proponerUnLugar"]')
    // )
    this.misArboles = sumarTusArbolesClicks.subscribe(
      activateSidebarSection('mis-arboles')
    )
    var userClicks = Dom$.click(
      dom.querySelector('[data-id="user-btn"]')
    )

    this.showPerfil = userClicks.subscribe(
      activateSidebarSection('perfil')
    )

    var volverAHomeClicks = Dom$.click(
      dom.querySelectorAll('.volver')
    )

    this.volverAHome = volverAHomeClicks.subscribe(
      activateSidebarSection('mainApp')
    )

    var conocerMasClicks = Dom$.click(
      dom.querySelector('[data-id="conocerMas"]')
    )

    conocerMasClicks.subscribe(function () {
      St('masInformacion.show').value = true
      St('masInformacion.active').value = 'masInfo'
    })

    // Home
    St('mainApp').value = {}
    St('masInfo').value = {}

    var sideBarContentMenuClicks = Dom$.click(
      dom.querySelectorAll('[data-id="actionMenu"] button')
    )

    sideBarContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('mainApp.content').value = active
      })

    var infoContentMenuClicks = Dom$.click(
      dom.querySelectorAll('#mas_info_side_menu > p')
    )

    infoContentMenuClicks
      .map(function (e) { return e.currentTarget.getAttribute('data-target') })
      .subscribe(function (active) {
        St('masInfo.content').value = active
      })

    var primeraVez = !!St('primeraVezBool').value
    if (primeraVez) {
      dom.querySelector('#primeraVez h1').textContent = dom.querySelector('#primeraVez h1').textContent + St('user.name').value
      Dom$.click(dom.querySelector('#elegirUbicacion'))
      .subscribe(function () {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
        } else {
          geoSuccess({coords: {latitude: -34.52, longitude: -58.446}})
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

    Dom$.click(dom.querySelector('[data-id="logout"]'))
      .subscribe(function () {
        window.location = '/logout'
      })
  }

  function destroy (s, f) {
  }

  function geoSuccess (position) {
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

  return {
    init: init,
    destroy: destroy
  }
}
