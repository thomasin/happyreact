import React from 'react'
import { connect } from 'react-redux'

const Switch = ({ history, login }) => {
  console.log(login)
  if (!login.isAuthenticated) {
    history.push('/login')
  }
  else {
    history.push('/dashboard/')
  }

  return null
}

function mapStateToProps (state) {
  return { login: state.login }
}

export default connect(mapStateToProps)(Switch)
