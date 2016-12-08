import React from 'react';
import cx from 'classnames'

var mouseDownIndexes = []
var mouseDown = false;

const ButtonContainer = (props) => {

  var primaryNoteButtons = []
  var bassNoteButtons = []

  const handleMouseDown = (noteButtonIndex, isPushed) => {
    mouseDown = true
    props.onButtonDown(noteButtonIndex)
  }

  const handleMouseUp = (noteButtonIndex, isPushed) => {
    mouseDown = false
    props.onButtonUp(noteButtonIndex)
  }

  const handleMouseLeave = (noteButtonIndex, isPushed) => {
    console.log(mouseDown)
    if (mouseDown) {
      mouseDown = false;
      props.onButtonUp(noteButtonIndex)
    }
  }

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
        onMouseDown={handleMouseDown.bind(null, i, noteButton.isPushed)}
        onMouseUp={handleMouseUp.bind(null, i, noteButton.isPushed)}
        onMouseLeave={handleMouseLeave.bind(null, i, noteButton.isPushed)}
        key={i}>
          <span className="degree">{i + 1}</span>
          <span className="absolute-degree">{noteButton.noteDisplay}</span>
          <span className="midi-value">{noteButton.noteValue}</span>
          <span className="noteName"></span>
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
          <span className="degree">{noteButton.relativeDegree}</span>
          <span className="absolute-degree">{noteButton.degree}</span>
          <span className="midi-value">{noteButton.noteValue}</span>
          <span className="noteName">{noteButton.noteDisplay}</span>
      </div>
    )
  }
  

  return (
      <div className="NoteButtonContainer">
        
        <div className="ButtonContainer">
          {primaryNoteButtons}
        </div>            


        
      </div>
   
  )
}

export default ButtonContainer