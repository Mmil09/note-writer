import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import notes from '../scripts/notes'
import scaleSpacings from '../scripts/scaleSpacings'

export default class ButtonContainer extends Component {

  render() {
    var colWidth = 2;
    var noteRowBreak = 6;
    var noteNames = Object.keys(notes);
    var row1 = noteNames.slice(0, noteRowBreak)
    var row2 = noteNames.slice(noteRowBreak)


    return (

        <div className="ButtonContainer">
          <Row>
            
            {row1.map((noteName) => {
              return (
                <Col s={colWidth} key={noteName}>
                  <Button waves='light'>{noteName}</Button>
                </Col>
              )
            })}
          
          </Row>
          <Row>
            
            {row2.map((noteName) => {
              return (
                <Col s={colWidth} key={noteName}>
                  <Button waves='light'>{noteName}</Button>
                </Col>
              )
            })}

          </Row>
        </div>
     
    );
  }
}
