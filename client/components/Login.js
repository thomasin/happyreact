import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className="container">
        <form method="post" action="/login">
          <input type="email" placeholder="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
