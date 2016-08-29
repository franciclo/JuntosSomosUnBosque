import './styles.css'

import 'state-stream'
import 'components/pop-up'
import 'components/form-async'
import React, {Component} from 'react'

export default class Form extends Component {
  constructor () {
    super()
    this.state = {
      formAlertShow: false,
      formAlertText: ''
    }
    this.formDidMount = this.formDidMount.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
  }

  formDidMount (form) {
    if (!form) return
    form.onResponse(res => {
      console.log('form response', res)
      res.json().then(data => {
        if (data.success) {
          if (typeof this.props.onSuccess === 'function') {
            this.props.onSuccess(data.result)
          }
          if (this.props.successAlert) {
            return this.setState({
              formAlertShow: true,
              formAlertText: data.text,
              formClass: 'success'
            })
          }
        } else {
          if (typeof this.props.onFail === 'function') {
            this.props.onFail(data.err)
          }
          if (this.props.failAlert) {
            return this.setState({
              formAlertShow: true,
              formAlertText: data.text,
              formClass: 'fail'
            })
          }
        }
      })
    })
    form.onSubmit(data => {
      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(data, form.sendForm)
      }
    })
  }

  closeAlert () {
    this.setState({formAlertShow: false})
  }

  render () {
    return (
      <div className='loguineo'>
        <form
          is='form-async'
          action={this.props.action}
          ref={this.formDidMount}
          data-auto={this.props.auto || ''}>
          <dialog
            is='alert-msg'
            class={this.state.formClass + ' alert-login'}
            active={
              this.state.formAlertShow
                ? 'active'
                : ''
            }>
            <span
              onClick={this.closeAlert}
              className='close'>
              &times;
            </span>
            {this.state.formAlertText}
          </dialog>
          {this.props.children}
        </form>
      </div>
    )
  }
}
