import React from 'react'

const AddNewEntry_InputRangeBar = (props) => {
  return (
    <div className={`row range ${props.title == 'outlook' ? 'section' : ''}`}>
      <div className="three columns">
        <label htmlFor={`${props.title}Bar`}>
          <h5 className="title inline h7">{props.leftInput}</h5>
        </label>
      </div>
      <div className="six columns">
        <input type="range" min="1" max="5" name={`${props.title}`} id={`${props.title}Bar`} value={props.value} onChange={(e) => props.updateForm(e)}/>
      </div>
      <div className="three columns">
        <label htmlFor={`${props.title}Bar`}>
          <h5 className="title inline h7">{props.rightInput}</h5>
        </label>
      </div>
    </div>
  )
}

export default AddNewEntry_InputRangeBar
