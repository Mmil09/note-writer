import React from 'react';
import ButtonContainer from './ButtonContainer'
import PositionGridContainer from './PositionGridContainer'
import ConfigContainer from './ConfigContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar'
import BottomBar from './BottomBar'

import keyboardBindings from '../scripts/keyboardBindings'
import synth from '../scripts/synth'

const SIZES = {
  normal: {
    width: 800,
    height: 600
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.socket = null;

    this.state = {
      size: {...SIZES.normal},
      config: props.initialConfig || {},
      noteButtons: props.initialNoteButtons || [],
      synthSettings: {
        enabled: true,
        type: 'sawtooth',
        volume: 0.3,
      },
      velocity: 86,
      velocityVariance: 0,
      channel: 1,

    }

    this.handlePositionChange = this._handlePositionChange.bind(this)
    this.handleScaleChange = this._handleScaleChange.bind(this)
    this.handleModeChange = this._handleModeChange.bind(this)
    this.handleOctaveChange = this._handleOctaveChange.bind(this)
    this.handleKeyChange = this._handleKeyChange.bind(this)
    this.handleToggleSynth = this._handleToggleSynth.bind(this)
    this.handleConfigChange = this._handleConfigChange.bind(this)
    this.handleVelocityChange = this._handleVelocityChange.bind(this)
    this.handleVelocityVarianceChange = this._handleVelocityVarianceChange.bind(this)
    this.handleButtonUp = this._handleButtonUp.bind(this)
    this.handleButtonDown = this._handleButtonDown.bind(this)
    this.handleSynthSettingsChange = this._handleSynthSettingsChange.bind(this)
  }

  componentDidMount() {
    var self = this;

    this.socket = window.io(this.props.socketUrl)

    keyboardBindings.call(self)

    this.socket.on('note_buttons_change', function(noteButtons) {
      self.setState({
        noteButtons: noteButtons
      })
    })

    this.socket.on('config_change', function(config) {
      self.setState({
        config: config
      })
    })

    this.socket.on('note_on', function(noteData) {
      if (self.state.synthSettings.enabled) {
        synth.playOscillator(noteData)
      }
      
    })

    this.socket.on('note_off', function(noteData) {
      if (self.state.synthSettings.enabled) {
        synth.stopOscillator(noteData)
      }
    })

    this.socket.on('note_buttons_change', function(noteButtons) {
      self.setState({
        noteButtons: noteButtons
      })
    })

  }

  _handlePositionChange(newPosition) {
    this.socket.emit('position_change', newPosition)
  }

  _handleScaleChange(newScale) {
    this.socket.emit('scale_change', newScale)
  }

  _handleModeChange(newMode) {
    this.socket.emit('mode_change', newMode)
  }

  _handleOctaveChange(newOctave) {
    this.socket.emit('octave_change', newOctave)
  }

  _handleKeyChange(newKey) {
    this.socket.emit('key_change', newKey)
  }

  _handleVelocityChange(e, newValue) {
    this.setState({
      velocity: newValue
    })
  }

  _handleVelocityVarianceChange(e, newValue) {
    this.setState({
      velocityVariance: newValue
    }) 
  }

  _handleToggleSynth() {
    var newEnabledState = !this.state.synthSettings.enabled;
    
    if (!newEnabledState) {
      synth.stopAllOscillators()
    }

    this.setState({
      synthSettings: {
        ...this.state.synthSettings,
        enabled: newEnabledState,
      }
    })
  }

  _handleConfigChange(configKey, newValue) {

    switch(configKey) {
      case 'scale':
        this._handleScaleChange(newValue)
        break;
      case 'key':
        this._handleKeyChange(newValue)
        break;
      case 'mode':
        this._handleModeChange(newValue)
        break;
      case 'octave':
        this._handleOctaveChange(newValue)
        break;
    }
  }

  _handleButtonUp(noteButtonIndex) {
    this.socket.emit('note_button_up', {
      noteButtonIndex: noteButtonIndex,
      velocity: this.state.velocity,
      channel: this.state.channel,
    })
  }

  _handleButtonDown(noteButtonIndex) {
    this.socket.emit('note_button_down', {
      noteButtonIndex: noteButtonIndex,
      velocity: this.state.velocity,
      channel: this.state.channel,
    })
  }

  _handleSynthSettingsChange(newSynthSettings) {
    this.setState({
      synthSettings: newSynthSettings
    })
  }

  render() {
    let {size, config, noteButtons} = this.state

    var style = {
      width: `${size.width}px`,
      height: `${size.height}px`
    }

    return (
      <MuiThemeProvider>
      	<div className="App" style={style}>
          
          <TopBar 
            config={config} 
            onConfigChange={this.handleConfigChange}
            velocity={this.state.velocity}
            velocityVariance={this.state.velocityVariance}
            onVelocityChange={this.handleVelocityChange}
            onVelocityVarianceChange={this.handleVelocityVarianceChange}
            synthSettings={this.state.synthSettings}
            onSynthSettingsChange={this.handleSynthSettingsChange}
          />

          <div className="Middle">
            
            <ButtonContainer 
              noteButtons={noteButtons}
              onButtonDown={this.handleButtonDown}
              onButtonUp={this.handleButtonUp}
              primaryNoteButtonRange={config.primaryNoteButtonRange}
              bassNoteButtonRange={config.bassNoteButtonRange}
            />

            <PositionGridContainer
              position={config.position}
              onPositionEnter={this.handlePositionChange}
            />


          </div>

          {false && <BottomBar/>}
        
        </div>
      </MuiThemeProvider>
     
    );
  }
}

/*
            <ConfigContainer 
              config={config}
              minOctave={config.minOctave}
              maxOctave={config.maxOctave}
              minKey={config.minKey}
              maxKey={config.maxKey}
              minPosition={config.minPosition}
              maxPosition={config.maxPosition}
              minMode={config.minMode}
              maxMode={config.maxMode}
              onScaleChange={this.props.onScaleChange}
              onPositionChange={this.props.onPositionChange}
              onModeChange={this.props.onModeChange}
              onKeyChange={this.props.onKeyChange}
              onOctaveChange={this.props.onOctaveChange}
            />
            */
