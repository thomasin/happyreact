import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { attemptLogin, clearError, createAccount } from '../actions/loginAuth'
import { duplicateEmailCheck } from '../scripts/loginApi.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.props.dispatch(clearError())
  }

  componentWillMount() {
    if (this.props.login.isAuthenticated) this.props.history.push('/dashboard/')
  }

  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(attemptLogin(this.state.email, this.state.password, () => {
      this.props.history.push('/dashboard/')
    }))
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
      return (
        <div className="container signUpContainer">
          <div className={`loginError ${this.props.login.message ? '' : 'transparent'}`}>
            { this.props.login.message }
          </div>

          <input type="email" placeholder="Email" name="email"
          className='email' value={this.state.email}
          onChange={(e) => this.handleChange(e)} />

        <input type="password" placeholder="Password" name="password"
          className='passwordLogin' value={this.state.password}
          onChange={(e) => this.handleChange(e)}/>

        <button type="submit" className="button-primary loginButton"
          onClick={(e) => this.handleClick(e)}>
           Login</button><br />
         <Link to="/signup" className="title">Don't have an account? Sign up</Link>
        </div>
    )
  }
}

Login = connect()(Login)
export default Login
