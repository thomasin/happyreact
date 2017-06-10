import {connect} from 'react-redux'

import SignUp from '../components/SignUp'

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(
  mapStateToProps
)(SignUp)
