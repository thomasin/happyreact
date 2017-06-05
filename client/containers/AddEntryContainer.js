import {connect} from 'react-redux'

import AddEntry from '../components/AddEntry'

const mapStateToProps = (state) => {
  return {
    invalid: state.invalid,
    variableValues: state.variableValues
  }
}

export default connect(
  mapStateToProps
)(AddEntry)
