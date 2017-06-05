import {connect} from 'react-redux'

import VariableRow from '../components/subcomponents/AddNewEntry_VariableRow'

const mapStateToProps = (state) => {
  return {
    variables: state.variables,
    variableValues: state.variableValues,
    invalid: state.invalid
  }
}

export default connect(
  mapStateToProps
)(VariableRow)
