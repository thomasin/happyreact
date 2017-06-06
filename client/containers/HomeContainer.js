import {connect} from 'react-redux'

import Home from '../components/Home'

const mapStateToProps = (state) => {
  return {
    entries: state.entries
  }
}

export default connect(
  mapStateToProps
)(Home)
