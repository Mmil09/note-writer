import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import ButtonContainer from './ButtonContainer'
import ConfigContainer from './ConfigContainer'
import notes from '../scripts/notes'
import scaleSpacings from '../scripts/scaleSpacings'

export default class App extends Component {

  render() {
    var colWidth = 2;
    var noteRowBreak = 6;
    var noteNames = Object.keys(notes);
    var row1 = noteNames.slice(0, noteRowBreak)
    var row2 = noteNames.slice(noteRowBreak)


    return (
    	<div>
        <ButtonContainer/>

        <ConfigContainer/>


      </div>
     
    );
  }
}
