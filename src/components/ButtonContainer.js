import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';

export default class ButtonContainer extends Component {

  render() {

    var colWidth = 2;
    var noteRowBreak = 4;
    
    var row1 = this.props.noteButtons.slice(0, noteRowBreak)
    var row2 = this.props.noteButtons.slice(noteRowBreak)


    return (
        <div className="ButtonContainer">            
            {this.props.noteButtons.map((noteButton) => {
              return (

                  <Button className={noteButton.isPushed ? 'active' : ''} key={noteButton.value} waves='light'>D:  {noteButton.degreeDisplay}, V: {noteButton.value}, N: {noteButton.noteDisplay}</Button>
   
              )
            })}
          
        </div>
     
    );
  }
}
