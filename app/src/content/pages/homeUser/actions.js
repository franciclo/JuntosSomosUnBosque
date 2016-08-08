import St from 'state'
import {Request} from 'utils'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    St('main_menu').value = {}
    Rx.Observable.fromEvent(
      dom.querySelectorAll('#home_sidebar header .menu>div'),
      'click'
    )
    .map((ev) => ev.currentTarget.getAttribute('data-target'))
    .subscribe(function (target) {
      St('sidebar_main.active').value = target
      St('main_menu.active').value = target
    })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="masInfoBtn"]'), 'click')
        .subscribe(function () {
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

    Rx.Observable.fromEvent(dom.querySelector('[data-id="evento-sidebar-mas"]'), 'click')
    .subscribe(function () {
      if (St('festival_pop.show').value) {
        St('festival_pop.show').value = false
      } else {
        dom.querySelector('.small-pop').click()
      }
    })

    var primeraVez = !!St('primeraVezBool').value
    if (primeraVez) {
      dom.querySelector('#primeraVez h1').textContent = dom.querySelector('#primeraVez h1').textContent + St('user.name').value
      Rx.Observable.fromEvent(dom.querySelector('#elegirUbicacion'), 'click')
      .subscribe(function () {
        if ('geolocation' in navigator) {
          try {
            navigator.geolocation.getCurrentPosition(function (position) {
              geoSuccess(dom, position)
            }, geoError)
          } catch (err) {
            console.error('fallo geolocation')
            geoSuccess(dom, {coords: {latitude: -34.55, longitude: -58.45}})
          }
        } else {
          geoSuccess(dom, {coords: {latitude: -34.55, longitude: -58.45}})
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
        St('user.type').value = v.result.type
        St('user.location').value = v.result.location
      })

    St('perfilPopup.show')
      .on(['E', 'N'])
      .filter((show) => show)
      .subscribe(function () {
        var location = St('user.location').value.split('::')
        var div = dom.querySelector('#ubicacionLocalFormPerfil')
        div.style.display = 'block'
        if (this.mapPerfil) {
          this.mapPerfil.setView([location[0], location[1]], 13)
        } else {
          this.mapPerfil = window.L.map(div).setView([location[0], location[1]], 13)
        }
        window.L.Icon.Default.imagePath = '/images'
        window.L.tileLayer(
          'https://api.mapbox.com/styles/v1/franciclo/cio8ufhm00023afmf9592ilip/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNpY2xvIiwiYSI6ImNpaXRlam5nZjAzaHl2cW01ZW55NjMwc28ifQ.6on5-qEDrK8yqMyUdATmlQ',
          {
            tileSize: 512,
            zoomOffset: -1
          })
          .addTo(this.mapPerfil)

        if (this.marker) {
          this.marker.setLatLng([location[0], location[1]])
        } else {
          this.marker = window.L.marker([location[0], location[1]]).addTo(this.mapPerfil)
        }
        var marker = this.marker
        dom.querySelector('[data-id="perfilLocationInput"]').value = St('user.location').value
        this.mapPerfil.on('click', function (ev) {
          marker.setLatLng(ev.latlng)
          dom.querySelector('[data-id="perfilLocationInput"]').value = ev.latlng.lat.toFixed(3) + '::' + ev.latlng.lng.toFixed(3)
        })
      })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="logout"]'), 'click')
      .subscribe(function () {
        window.location = '/logout'
      })

    Rx.Observable.fromEvent(dom.querySelector('[data-id="verPerfil"]'), 'click')
      .subscribe(function () {
        St('perfilPopup.active').value = 'perfil'
        St('perfilPopup.show').value = true
        dom.querySelector('#userDropdown [type="checkbox"]').checked = false
      })

    Rx.Observable
      .merge(
        Rx.Observable.fromEvent(
          dom.querySelector('[data-id="sumarTusArboles"]'),
          'click'
        ),
        Rx.Observable.fromEvent(
          dom.querySelector('[data-id="sumarMisArboles"]'),
          'click'
        )
      )
      .subscribe(function () {
        St('mis_arboles_cont.active').value = 'verFormSuma'
      })

    Rx.Observable.fromEvent(
      dom.querySelector('[data-id="volverFormSuma"]'),
      'click'
    )
    .subscribe(function () {
      var homeMisArboles = St('user.arboles').value ? 'misSuma' : 'cartelSuma'
      St('mis_arboles_cont.active').value = homeMisArboles
    })

    St('form_suma.formNotification')
      .on('N')
      .filter(function (notification) {
        return notification.success
      })
      .subscribe(function (v) {
        St('user.arboles').value = v.result.arboles
      })

    Request('todos_los_arboles')
      .then(function (result) {
        if (result.success) {
          St('all-users').value = result.result
            .map(function (user) {
              var loc = user.loc ? user.loc.split('::') : [0, 0]
              user.loc = {lat: +loc[0], lon: +loc[1]}
              return user
            })
        } else {
          console.error('api error: todos_los_arboles')
        }
      })
  }

  function destroy (s, f) {
    this.showOlvido.dispose()
    this.showRegistrar.dispose()
    this.showLogin.dispose()
    this.onOlvidoSucces.dispose()
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

  function geoError (dom) {

      console.error('geo error', err)
  }

  return {init, destroy}
}
