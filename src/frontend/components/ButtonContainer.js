import React from 'react';
import cx from 'classnames'

const ButtonContainer = (props) => {

  var primaryNoteButtons = []
  var bassNoteButtons = []

  for (var i = props.primaryNoteButtonRange[0]; i <= props.primaryNoteButtonRange[1]; i++) {
    
    var noteButton = props.noteButtons[i]

    var classes = {
      'NoteButton': true,
      primary: true,
      active: noteButton.isPushed,
    }
      
    primaryNoteButtons.push(
      <div 
        className={cx(classes)} 
        key={i}>
          <span className="degree">{noteButton.degree} ({noteButton.relativeDegree})</span>
          <span className="value"></span>
          <span className="noteName">{noteButton.noteDisplay}</span>
      </div>
    )

  }

  for (var i = props.bassNoteButtonRange[0]; i <= props.bassNoteButtonRange[1]; i++) {
    
    var noteButton = props.noteButtons[i]

    var classes = {
      'NoteButton': true,
      bass: true,
      active: noteButton.isPushed,
    }

    //V: {noteButton.noteValue}, N: {noteButton.noteDisplay}
    bassNoteButtons.push(
      <div 
        className={cx(classes)} 
        key={i}>
          <span className="degree">{noteButton.degree}</span>
          <span className="value"></span>
          <span className="noteName">{noteButton.noteDisplay}</span>
      </div>
    )
  }


  return (
      <div className="NoteButtonContainer">
        
        <div className="ButtonContainer">
          {primaryNoteButtons}
        </div>            

        <div className="ButtonContainer">
          {bassNoteButtons}
        </div> 
        
      </div>
   
  )
}

export default ButtonContainer