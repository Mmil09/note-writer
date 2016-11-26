import React from 'react';

export default class ButtonContainer extends React.Component {

  render() {

    var colWidth = 2;
    var noteRowBreak = 4;
    
    var row1 = this.props.noteButtons.slice(0, noteRowBreak)
    var row2 = this.props.noteButtons.slice(noteRowBreak)


    return (
        <div className="ButtonContainer">            
            {this.props.noteButtons.map((noteButton, index) => {
              return (

                  <Button className={noteButton.isPushed ? 'active' : ''} key={index} waves='light'>D:  {noteButton.degreeDisplay}, V: {noteButton.value}, N: {noteButton.noteDisplay}</Button>
   
              )
            })}
          
        </div>
     
    );
  }
}
