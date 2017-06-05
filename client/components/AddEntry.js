import React from 'react'
import {connect} from 'react-redux'

import {getAllOfTable, submitEntry} from '../scripts/api'
import VariableRowContainer from '../containers/VariableRowContainer'
import InputRangeBar from './subcomponents/AddNewEntry_InputRangeBar'
import {validateVariableValues} from '../scripts/utils/validation'

class AddEntry extends React.Component {
  constructor (props) {
    super(props)
    this.freshState = {
      entry: '',
      energy: '3',
      outlook: '3'
    }
    this.state = this.freshState
  }

  updateForm (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm (e) {
    e.preventDefault()
    if (!this.props.invalid.length) {
      submitEntry(this.state, (err) => this.submitFeedback(err))
    }
  }

  refresh () {
    this.setState(this.freshState)
  }

  submitFeedback (err) {
    if (!err) {
      console.log('success!')
      this.refresh()
    } else {
      console.log(err)
    }
  }

  render () {
    return (
      <div className='container'>
        <form method='post'>

          <InputRangeBar
            title='energy'
            leftInput='Low Energy'
            rightInput='High Energy'
            value={this.state.energy}
            updateForm={this.updateForm.bind(this)}
            />

          <InputRangeBar
            title='outlook'
            leftInput='Negative'
            rightInput='Positive'
            value={this.state.outlook}
            updateForm={this.updateForm.bind(this)} />

          <VariableRowContainer />

          <div className='row'>
            <textarea className='entryText text' name='entry' onChange={(e) => this.updateForm(e)} value={this.state.entry}>{this.state.entry}</textarea>
          </div>

          <div className='row'>
            <button
              type='submit' className={`button-primary ${this.props.invalid.length ? 'disabled' : ''}`} id='createButton' onClick={(e) => this.submitForm(e)}>Create</button>
          </div>
        </form>
      </div>

    )
  }
}

AddEntry = connect()(AddEntry)
export default AddEntry
