import React from 'react'
import {connect} from 'react-redux'
import trim from 'trim'
import validator from 'validator'
import { attemptLogin, clearError, createAccount } from '../actions/loginAuth'
import { duplicateEmailCheck } from '../scripts/loginApi.js'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      passwordStrength: undefined,
      passwordError: '',
      popup: false
    }
    document.getElementById("app").addEventListener("click", (e) => {
      let popup = document.getElementById("popup")
      if (e.target !== popup && !popup.contains(e.target)) {
        this.showPopup(false)
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.login.signUpEmailError) {
      this.setState({
        errorMessageEmail: newProps.login.signUpEmailError
      })
    }
  }

  componentWillMount() {
    if (this.props.login.isAuthenticated) this.props.history.push('/dashboard/')
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.password != '') {
      this.props.dispatch(createAccount(this.state.email, this.state.password, () => {
        this.props.history.push('/dashboard/')
      }))
    } else {
      this.setState({
        passwordError: "Please enter a password"
      })
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name == "password")
     this.checkPasswordStrength(e)
     if (this.state.passwordError.length && e.target.value !== '') {
       this.setState({
         passwordError: ''
       })
     }
  }

  validateEmail(e) {
        if (this.state.email === '') {
          this.setState({
            errorMessageEmail: 'Please enter an email address'
          })
        } else if (!validator.isEmail(this.state.email)) {
          this.setState({
            errorMessageEmail: 'Not a valid email address'
          })
        } else {
          duplicateEmailCheck(this.state.email, (err, res) => {
            if (res.body.doesExist) {
              this.setState({
                errorMessageEmail: 'An account with this address already exists, try logging in'
              })
            } else {
              this.setState({
                errorMessageEmail: ''
              })
            }
          })
        }
  }

  checkPasswordStrength (e) {
    if (e.target.value === '') {
      this.setState({
        passwordError: 'Please enter a password'
      })
    }
    let passwordObject = zxcvbn(this.state.password)
    this.setState({
      passwordStrength: passwordObject.score
    })
  }

  getColour(strength) {
    if (strength <= 2) {
      return d3.interpolateInferno((strength/15)+0.6)
    }
    strength = strength == 3 ? 4 : 3
    return d3.interpolateViridis((strength)/4)
  }

  passwordStrengthArray(strength) {
    return <div className={`passwordStrengthBar strength${strength}`} style={{backgroundColor: this.getColour(strength)}}></div>
  }

  showPopup (bool) {
    this.setState({
      popup: bool
    })
  }

  render () {
    return (
      <div className="container signUpContainer">

        <div className={`passwordTipsPopup ${this.state.popup ? '' : 'hiddenpop'}`} id="popup">
          <button className="button-primary closePopUpButton" onClick={() => this.showPopup(false)}>X</button>
          <h6 className="title">Password Strength</h6>
          We use <a href="https://github.com/dropbox/zxcvbn">zxcvbn</a> for password strength estimation. The strength bar is only a guide but be careful about creating a weak password. Some effective ways to increase password strength are:<br />
            * Add another word or two (spaces are ok)<br />
            * Uncommon words are better<br />
            * Avoid number sequences<br />
            * Avoid repeated words and letters
        </div>



        <input type="email" placeholder="Email" name="email"
        className={`email ${ this.state.errorMessageEmail.length ? 'invalid' : ''}`}
        value={this.state.email}
        onChange={(e) => this.handleChange(e)}
        onBlur={(e) => this.validateEmail(e)}
        required />

      <div className="signUpError">{ this.state.errorMessageEmail } </div>

      <div className="pwContainer">
        <input type="password" placeholder="Password" name="password"
          className={`password ${ this.state.passwordError.length ? 'invalid' : ''}`}
          value={this.state.password}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.checkPasswordStrength(e)}
          required />
        <button className="passwordTips"
          onClick={() => this.showPopup(true)}>?</button>
      </div>


      <div className="passwordStrengthContainer">
              {this.passwordStrengthArray(this.state.passwordStrength)}
      </div>

            <div className="signUpError pw">{ this.state.passwordError } </div>

        <button type="submit" className="button-primary"
        onClick={(e) => this.handleClick(e)}>
         Sign Up</button><br />
      </div>
    )
  }
}

SignUp = connect()(SignUp)
export default SignUp
