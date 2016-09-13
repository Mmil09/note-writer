import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import notes from '../scripts/notes'
import scales from '../scripts/scales'
import modes from '../scripts/modes'
import store from '../stores/appStore'
var _ = require('lodash')

export default class ConfigContainer extends Component {

  handleConfigChange(field, e) {
    console.log('handling change')
    var value = e.target.value
    var data = {};
    data[field] = Number(value);

    if (data[field] !== this.props[field]) {
      store.dispatch({
        type: 'CONFIG_CHANGE',
        data: data,
      })      
    }
  }

  handleScaleChange(e) {
    var scaleName = e.target.value;
    var scale = scales[scaleName]
    var data = {scale: scale}

    store.dispatch({
      type: 'CONFIG_CHANGE',
      data: data,
    }) 
  }

  render() {
    // var invertedModes = _.invert(modes);
    // var currentModeName = invertedModes(this.props.config.mode);
    // console.log(currentModeName)
    // var currentModeName = currentModeName.charAt(0).toUpperCase() + currentModeName.slice(1) + "(" + (this.props.config.mode+ 1) + ")"

    return (
      <div className="ConfigContainer">
          <Row className="label-row">
            <Col s={12}>
              <label>Scale</label>
            </Col>
          </Row>

          <Row>
            <Input s={12} type='select' onChange ={this.handleScaleChange.bind(this)}>
              {Object.keys(scales).map((scaleName) => {
                return (
                  <option key={scaleName} value={scaleName}>{scaleName}</option>
                )
              })}
            </Input>
          </Row>

          <Row className="label-row">
            <Col s={12}>
              <label>Mode (Start Degree):</label>
            </Col>
          </Row>

          <Row>
            <Input s={12} type='select' onChange={this.handleConfigChange.bind(this, 'mode')}>
              {Object.keys(modes).map((modeName) => {
                return (
                  <option value={modes[modeName]} key={modeName}>{modeName.charAt(0).toUpperCase() + modeName.slice(1)} ({modes[modeName] + 1})</option>
                )
              })}
            </Input>
          </Row>

          <Row className="label-row">
            <Col s={12}>
              <label>Octave</label>
            </Col>
          </Row>

          <Row>
            <Col s={12}>

                <p className="range-field">
                  <input type="range" min="0" max="12" value={this.props.config.octave} onChange={this.handleConfigChange.bind(this, 'octave')}/>
                </p>

            </Col>

          </Row>

          <Row className="label-row">
            <Col s={12}>
              <label>Key</label>
            </Col>
          </Row>

          <Row>
            <Col s={12}>

                <p className="range-field">
                  <input type="range" min="0" max="12" value={this.props.config.key} onChange={this.handleConfigChange.bind(this, 'key')}/>
                </p>
            </Col>

          </Row>

          <Row className="label-row">
            <Col s={12}>
              <label>Position</label>
            </Col>
          </Row>

          <Row>
            <Col s={12}>

                <p className="range-field">
                  <input type="range" min="0" max="7" value={this.props.config.position} onChange={this.handleConfigChange.bind(this, 'position')}/>
                </p>
            </Col>

          </Row>
      </div>
    );
  }
}
