import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import notes from '../scripts/notes'
import scaleSpacings from '../scripts/scaleSpacings'

export default class ConfigContainer extends Component {

  render() {

    return (
      <div className="ConfigContainer">
          <Row>
            <Col s={12}>
              <label>Scale</label>
            </Col>
          </Row>

          <Row>
            <Input s={12} type='select'>
              {Object.keys(scaleSpacings).map((scaleName) => {
                return (
                  <option key={scaleName}>{scaleName}</option>
                )
              })}
            </Input>
          </Row>

          <Row>
            <Col s={12}>
              <label>Octave</label>
            </Col>
          </Row>

          <Row>
            <Col s={12}>
              <form action="#">
                <p className="range-field">
                  <input type="range" id="test5" min="0" max="12" defaultValue="6 "/>
                </p>
              </form>
            </Col>

          </Row>
      </div>
    );
  }
}
