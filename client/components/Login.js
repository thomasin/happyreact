import React from 'react'
import {connect} from 'react-redux'
import { attemptLogin, clearError, createAccount } from '../actions/loginAuth'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      displayLogin: true
    }
    this.props.dispatch(clearError())
  }

  componentWillMount() {
    if (this.props.login.isAuthenticated) this.props.history.push('/')
  }

  handleClick(e) {
    e.preventDefault()
    this.state.displayLogin
    ? this.props.dispatch(attemptLogin(this.state.email, this.state.password, () => {
      this.props.history.push('/')
    }))
    : this.props.dispatch(createAccount(this.state.email, this.state.password, () => {
      this.props.history.push('/')
    }))
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleDisplay(e) {
    e.preventDefault()
    this.setState({
      displayLogin: !this.state.displayLogin
    })
  }

  render () {
    return (
      <div className="container loginContainer">
        <div className={`twelve columns tooltip ${this.props.login.message ? '' : 'hidden'}`} >
          {this.props.login.message}
        </div> <br />
        <label htmlFor="email">Email</label><input type="email" placeholder="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}/><br />
          <label htmlFor="password">Password</label><input type="password" placeholder="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/><br />
          <button type="submit" className="button-primary" onClick={(e) => this.handleClick(e)}>{this.state.displayLogin ? 'Login' : 'Register'}</button><br />
          <a href="#" onClick={(e) => this.toggleDisplay(e)} className="title">{this.state.displayLogin ? 'Create an Account' : 'Login to an Account'}</a>
      </div>
    )
  }
}

Login = connect()(Login)
export default Login
