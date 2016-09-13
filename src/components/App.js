import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import ButtonContainer from './ButtonContainer'
import ConfigContainer from './ConfigContainer'


export default class App extends Component {

  render() {

    return (
    	<div>
          <Row>
            <Col s={4}>
              <ButtonContainer noteButtons={this.props.noteButtons}/>
            </Col>
            <Col s={8}>
              <ConfigContainer config={this.props.config}/>
            </Col>
          </Row>
      </div>
     
    );
  }
}
