import {connect} from 'react-redux'

import Login from '../components/Login'

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(
  mapStateToProps
)(Login)
