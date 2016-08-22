import './styles.css'

import 'components/form-async'
import React, {Component} from 'react'

export default class Voluntariado extends Component {
  componentDidMount() {
    
    this.refs.form.$ubmit
      .subscribe((res) => {
        debugger
        console.log(res)
      })     
  }

  render () {
    return (
      <form
        is='form-async'
        data-path='popups.list.festi.voluntariado'
        data-auto='true'
        action='/lala'
        ref='form'>
        <input type='text' name='lala' required />
        <input type='text' name='lalssa' required />
        <input type='text' name='laadala' required />
        <button type='submit'>Send</button>
      </form>
    )
  }
}
