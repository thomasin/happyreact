import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable} from '../../scripts/api'
import AddNewEntry_VariableRow from './subcomponents/AddNewEntry_VariableRow'

class AddEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <form method="post">

          <div className="row range">
            <div className="three columns">
              <label htmlFor="energyBar">
                <h5 className="title inline h7">Low Energy</h5>
              </label>
            </div>
            <div className="six columns">
              <input type="range" min="1" max="5" name="energy" id="energyBar" defaultValue="3" />
            </div>
            <div className="three columns">
              <label htmlFor="energyBar">
                <h5 className="title inline h7">High Energy</h5>
              </label>
            </div>
          </div>

          <div className="row range section">
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Negative</h5>
              </label>
            </div>
            <div className="six columns">
              <input type="range" min="1" max="5" name="outlook" id="outlookBar" defaultValue="3" />
            </div>
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Positive</h5>
              </label>
            </div>
          </div>

          <AddNewEntry_VariableRow />

          <div className="row">
            <textarea className="entryText text" name="entry"></textarea>
          </div>

          <div className="row">
            <button type="submit" className="button-primary">Create</button>
          </div>
        </form>
      </div>

    )
  }
}


export default AddEntry
