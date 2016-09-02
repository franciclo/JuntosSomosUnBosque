import './styles.css'

import 'state-stream'
import 'components/dia-log'
import React, {Component} from 'react'

export default class Form extends Component {
  constructor () {
    super()
    this.state = {
      formAlertShow: false,
      formAlertText: ''
    }
    this.closeAlert = this.closeAlert.bind(this)
    this.sendForm = this.sendForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  closeAlert () {
    this.setState({formAlertShow: false})
  }

  onSubmit (e) {
    e.preventDefault()
    let data = new window.FormData(e.target)
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(data, this.sendForm)
    }
    if (this.props.prevent) return
    this.sendForm(data)
  }

  sendForm (data) {
    if (!this.props.action) throw new Error('form-async needs action')
    window.fetch(
      this.props.action,
      {
        credentials: 'same-origin',
        method: 'post',
        body: data
      })
      .catch(err => { console.warn('Request Internal Error action="' + this.props.action + '"', err) })
      .then(res => {
        res.json()
          .then(data => {
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
  }

  render () {
    return (
      <div className='loguineo'>
        <form
          onSubmit={this.onSubmit}>
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
