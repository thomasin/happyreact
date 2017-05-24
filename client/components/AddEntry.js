import React from 'react'
import {Link} from 'react-router-dom'
import {getAllOfTable} from '../../scripts/api'

class AddEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getAllOfTable('variable', console.log)
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
              <input type="range" min="1" max="5" name="energy" id="energyBar" />
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
              <input type="range" min="1" max="5" name="outlook" id="outlookBar" />
            </div>
            <div className="three columns">
              <label htmlFor="outlookBar">
                <h5 className="title inline h7">Positive</h5>
              </label>
            </div>
          </div>

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

// VARIABLE COMPONENT
// <div class="row variableRow section">
//   {{#each variables}}
//   <div class="three columns">
//     <label for="{{this.name}}">{{this.name}}</label>
//     <input type="text" name="{{this.id}}" id="{{this.name}}" value={{this.value}}>
//   </div>
//   {{/each}}
//   <div class="three columns">
//     <label for="newVariable">~</label>
//     <div class="together">
//       <input type="text" name="newVariable" class="leftInput" id="newVariable" placeholder="Add new variable">
//       <button type="submit" formaction="/addEntry/addVariable" class="button rightInput">></button>
//     </div>
//   </div>
// </div>
// ENTRY TEXT

export default AddEntry
