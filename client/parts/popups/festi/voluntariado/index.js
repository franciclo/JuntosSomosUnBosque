import './styles.css'

import 'components/form-async'
import React, {Component} from 'react'

export default class Voluntariado extends Component {
  componentDidMount() {
    this.refs.form.onSubmit((data) => {
      console.log('falsethis.refs.form.onSubmit((data) =>', data)
    })
    this.refs.form.onResponse((res) => {
      console.log('this.refs.form.onResponse((res) =>', res)
    })
  }

  render () {
    return (
      <form
        is='form-async'
        data-path='popups.list.festi.voluntariado'
        data-auto='false'
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
