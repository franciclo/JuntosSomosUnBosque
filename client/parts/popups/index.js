import React, {Component} from 'react'
// import Signin from './popups/signin'
// import Signup from './popups/signup'
// import Forgot from './popups/forgot'
// import Profile from './popups/profile'
// import PrimerLogin from './popups/primer-login'
// import Reset from './popups/reset'
// import Flyer from './popups/flyer'
import Festi from './festi'

export default class Popups extends Component {
  render () {
    var primerLogin = null
    var signin = null
    var signup = null
    var forgot = null
    var profile = null
    var reset = null
    var flyer = null

    // if (window.$tate('user.primerLogin').value) {
    //   primerLogin = <PrimerLogin />
    // }

    // if (window.$tate('user').value) {
    //   signin = <Signin />
    //   signup = <Signup />
    //   forgot = <Forgot />
    // } else {
    //   profile = <Profile />
    // }

    // if (window.$tate('user').value) {
    //   reset = <Reset />
    // }
    return (
      <div id='popups_layout'>
        {signin}
        {signup}
        {forgot}
        {profile}
        {primerLogin}
        {reset}
        {flyer}
        <Festi />
      </div>
    )
  }
}
