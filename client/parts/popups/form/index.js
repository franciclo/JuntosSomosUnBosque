import './styles.css'

import 'state-stream'
// import 'components/dia-log'
import 'components/form-async'
// import 'components/alert-msg'
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
          data-auto={this.props.dataAuto || ''}>
          <dia-log
            class={this.state.formClass + ' alert-login alert-msg'}
            data-open={
              this.state.formAlertShow
                ? 'open'
                : ''
            }>
            <span
              onClick={this.closeAlert}
              className='close'>
            </span>
            {
              this.state.formAlertText.split('\n')
                .map(function (item, i) {
                  return (
                    <span key={i}>
                      {item}
                      <br />
                    </span>
                  )
                })
            }
          </dia-log>
          {this.props.children}
        </form>
      </div>
    )
  }
}
