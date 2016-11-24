import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import notes from '../scripts/notes'
import scales from '../scripts/scales'
import modes from '../scripts/modes'
var _ = require('lodash')



const ConfigContainer = (props) => {

  const handleScaleChange = (e) => {
    props.onScaleChange(e.target.value)
  }

  const handleModeChange = (e) => {
    props.onModeChange(Number(e.target.value))
  }

  const handleOctaveChange = (e) => {
    props.onOctaveChange(Number(e.target.value))
  }

  const handleKeyChange = (e) => {
    props.onKeyChange(Number(e.target.value))
  }

  const handlePositionChange = (e) => {
    props.onPositionChange(Number(e.target.value))
  }

  return (
    <div className="ConfigContainer">
        <Row className="label-row">
          <Col s={12}>
            <label>Scale</label>
          </Col>
        </Row>

        <Row>
          <Input s={12} type='select' onChange={handleScaleChange}>
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
          <Input s={12} type='select' onChange={handleModeChange}>
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
                <input type="range" min={String(props.minOctave)} max={String(props.maxOctave)} value={props.config.octave} onChange={handleOctaveChange}/>
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
                <input type="range" min={String(props.minKey)} max={String(props.maxKey)} value={props.config.key} onChange={handleKeyChange}/>
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

              
                <input type="range" min={String(props.minPosition)} max={String(props.maxPosition)} value={props.config.position} onChange={handlePositionChange}/>
              </p>
          </Col>

        </Row>
    </div>
  );
}

export default ConfigContainer
