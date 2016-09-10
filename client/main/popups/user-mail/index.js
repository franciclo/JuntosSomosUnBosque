import './styles.css'

import 'components/dia-log'
import React, {Component} from 'react'
import Form from 'utils/form'

export default class UserMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emailVerificationSent: null,
      emailToVerify: null
    }
    this.onSuccess = this.onSuccess.bind(this)
  }

  componentWillMount () {
    this.setState({
      emailVerificationSent: this.props.emailVerificationSent,
      emailToVerify: this.props.emailToVerify
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      emailVerificationSent: props.emailVerificationSent,
      emailToVerify: props.emailToVerify
    })
  }

  onSuccess () {
    this.setState({emailVerificationSent: true})
  }

  render () {
    return (
      <dia-log
        data-open-modal={this.props.open}>
        <div className='logineo user-mail'>
          {
            !this.state.emailVerificationSent &&
            (
              <Form
                action='/mail-verification'
                failAlert='true'
                onSuccess={this.onSuccess}>
                <label className='legend'>Validá la cuenta con tu mail</label>
                <div className='form-row-field'>
                  <label htmlFor='emailForgotForm'>Mail</label>
                  <input
                    id='emailForgotForm'
                    name='email'
                    type='text'
                    defaultValue={this.props.emailToVerify || ''}
                    required />
                </div>
                <div className='form-row-field foot-buttons'>
                  <button
                    type='submit'>
                    Enviar
                  </button>
                </div>
              </Form>
            )
          }
          {
            this.state.emailVerificationSent &&
            (
              <div className='email-sent'>
                <p>El mail de verificación ya fue enviado, revisá tu bandeja de entrada.</p>
                <button
                  onClick={e => {
                    this.setState({emailVerificationSent: false})
                  }}>
                  Reenviar
                </button>
              </div>
            )
          }
        </div>
      </dia-log>
    )
  }
}
