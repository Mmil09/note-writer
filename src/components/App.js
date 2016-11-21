import React, { Component } from 'react';
import {Input, Button, Card, Row, Col} from 'react-materialize';
import ButtonContainer from './ButtonContainer'
import ConfigContainer from './ConfigContainer'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      config: props.noteWriter.getConfig(),
      noteButtons: props.noteWriter.getNoteButtons(),
    }

    this.handlePositionChange = this._handlePositionChange.bind(this)
    this.handleScaleChange = this._handleScaleChange.bind(this)
    this.handleModeChange = this._handleModeChange.bind(this)
    this.handleOctaveChange = this._handleOctaveChange.bind(this)
    this.handleKeyChange = this._handleKeyChange.bind(this)
  }

  componentDidMount() {
    var self = this;
    //render for config change
    this.unsubscribeConfigChange = this.props.noteWriter.on('config_change', function(newConfig) {
      self.setState({
        config: newConfig,
        noteButtons: self.state.noteButtons
      })
    })

    //render for note buttons change
    this.unsubscribeNoteButtonsChange = this.props.noteWriter.on('note_buttons_change', function(newNoteButtons) {
      self.setState({
        config: self.state.config,
        noteButtons: newNoteButtons
      })
    })
  }

  _handlePositionChange(newPosition) {
    this.props.noteWriter.trigger('position_change', newPosition)
  }

  _handleScaleChange(newScale) {
    console.log(newScale)
    this.props.noteWriter.trigger('scale_change', newScale)
  }

  _handleModeChange(newMode) {
    this.props.noteWriter.trigger('mode_change', newMode)
  }

  _handleOctaveChange(newOctave) {
    this.props.noteWriter.trigger('octave_change', newOctave)
  }

  _handleKeyChange(newKey) {
    this.props.noteWriter.trigger('key_change', newKey)
  }

  render() {
    var noteWriter = this.props.noteWriter

    return (
    	<div>
          <Row>
            <Col s={4}>
              <ButtonContainer 
                noteButtons={this.state.noteButtons}
              />
            </Col>
            <Col s={8}>
              <ConfigContainer 
                config={this.state.config}
                minOctave={noteWriter.minOctave}
                maxOctave={noteWriter.maxOctave}
                minKey={noteWriter.minKey}
                maxKey={noteWriter.maxKey}
                minPosition={noteWriter.minPosition}
                maxPosition={noteWriter.maxPosition}
                minMode={noteWriter.minMode}
                maxMode={noteWriter.maxMode}
                onScaleChange={this.handleScaleChange}
                onPositionChange={this.handlePositionChange}
                onModeChange={this.handleModeChange}
                onKeyChange={this.handleKeyChange}
                onOctaveChange={this.handleOctaveChange}
              />
            </Col>
          </Row>
      </div>
     
    );
  }
}
