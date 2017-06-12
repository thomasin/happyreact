import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import trim from 'trim'

import validation from '../../utils/validation'
import { attemptLogin, clearError, createAccount } from '../actions/loginAuth'
import { duplicateEmailCheck } from '../scripts/loginApi'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      passwordStrength: undefined,
      passwordError: '~',
      popup: false,
      canSubmit: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.login.signUpEmailError) {
      this.setState({
        errorMessageEmail: newProps.login.signUpEmailError
      })
    }
  }

  componentWillMount () { // Only display page if user not logged in
    if (this.props.login.isAuthenticated) this.props.history.push('/dashboard/')
  }

  componentDidMount () { // Add event listener to pop up
    document.getElementById('app').addEventListener('click', (e) => {
      let popup = document.getElementById('popup')
      if (e.target !== popup && !popup.contains(e.target)) {
        this.showPopup(false)
      }
    })
  }

  handleClick (e) {
    e.preventDefault()
    if (this.state.canSubmit && this.state.email !== '' && this.state.password !== '') {
      this.props.dispatch(createAccount(this.state.email, this.state.password, () => {
        this.props.history.push('/dashboard/')
      }))
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name == 'password') { this.checkPasswordStrength(e) }
  }

  validateEmail (e) {
    validation.isValidEmail_signUp(this.state.email, (checkedEmail) => {
      if (checkedEmail.valid) {
        duplicateEmailCheck(this.state.email, (err, res) => {
          if (res.body.doesExist) {
            this.setState({
              errorMessageEmail: 'An account with this address already exists, try logging in',
              canSubmit: false
            })
          } else {
            this.setState({
              errorMessageEmail: '',
              canSubmit: true
            })
          }
        })
      } else {
        this.setState({
          errorMessageEmail: checkedEmail.message,
          canSubmit: false
        })
      }
    })
  }

  checkPasswordStrength (e) {
    let passwordFeedback = validation.isValidPassword_signUp(e.target.value)
    this.setState({
      passwordStrength: passwordFeedback.strength,
      passwordError: passwordFeedback.message,
      canSubmit: !!passwordFeedback.strength
    })
  }

  getColour (strength) { // Calculate the colour for the strength bar
    if (strength <= 2) {
      return d3.interpolateInferno((strength / 15) + 0.6)
    }
    strength = strength == 3 ? 4 : 3
    return d3.interpolateViridis((strength) / 4)
  }

  passwordStrengthBar (strength) {
    return <div className={`passwordStrengthBar strength${strength}`} style={{backgroundColor: this.getColour(strength)}} />
  }

  showPopup (bool) {
    this.setState({
      popup: bool
    })
  }

  render () {
    return (
      <div className='container signUpContainer'>

        <div className={`passwordTipsPopup ${this.state.popup ? '' : 'hiddenpop'}`} id='popup'>
          <button className='button-primary closePopUpButton' onClick={() => this.showPopup(false)}>X</button>
          <h6 className='title'>Password Strength</h6>
          We use <a href='https://github.com/dropbox/zxcvbn'>zxcvbn</a> for password strength estimation. The strength bar is only a guide but be careful about creating a weak password. Some effective ways to increase password strength are:<br />
            * Add another word or two (spaces are ok)<br />
            * Uncommon words are better<br />
            * Avoid number sequences<br />
            * Avoid repeated words and letters
        </div>

        <input type='email' placeholder='Email' name='email'
          className={`email ${this.state.errorMessageEmail.length ? 'invalid' : ''}`}
          value={this.state.email}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.validateEmail(e)}
          required />

        <div className='signUpError'>{ this.state.errorMessageEmail } </div>

        <div className='pwContainer'>
          <input type='password' placeholder='Password' name='password'
            className={`password ${this.state.passwordError !== '~' ? 'invalid' : ''}`}
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.checkPasswordStrength(e)}
            required />
          <button className='passwordTips'
            onClick={() => this.showPopup(true)}>?</button>
        </div>

        <div className='passwordStrengthContainer'>
          {this.passwordStrengthBar(this.state.passwordStrength)}
        </div>

        <div className={`signUpError pw ${this.state.passwordError !== '~' ? '' : 'transparent'}`}>{ this.state.passwordError }</div>

        <button type='submit' className={`button-primary ${this.state.canSubmit ? '' : 'disabled'}`}
          onClick={(e) => this.handleClick(e)}>
         Sign Up</button><br />
        <Link to='/' className='title'>Already have an account? Log in</Link>
      </div>
    )
  }
}

SignUp = connect()(SignUp)
export default SignUp
