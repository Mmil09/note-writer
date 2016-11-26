import React from 'react';
import cx from 'classnames'
import FlatButton from 'material-ui/FlatButton';

const ButtonContainer = (props) => {



  return (
      <div className="ButtonContainer">            
          {props.noteButtons.map((noteButton, index) => {
            
            var classes = {
              'NoteButton': true,
              active: noteButton.isPushed,
            }

            var buttonStyle = {
              height: '50px'
            }

            return (
              <FlatButton style={buttonStyle} className={cx(classes)} key={index}>D:  {noteButton.degree}, V: {noteButton.noteValue}, N: {noteButton.noteDisplay}</FlatButton>
            )
          })}
        
      </div>
   
  )
}

export default ButtonContainer