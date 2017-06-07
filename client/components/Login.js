import React from 'react'
import {connect} from 'react-redux'
import { attemptLogin } from '../actions/loginAuth'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps(props) {
    if (props.login.isAuthenticated) this.props.history.push('/')
  }

  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(attemptLogin(this.state.email, this.state.password))
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className="container">
          {this.props.login.message ? this.props.login.message : ''}<br />
          <input type="email" placeholder="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
          <button type="submit" onClick={(e) => this.handleClick(e)}>Login</button>
      </div>
    )
  }
}

Login = connect()(Login)
export default Login
