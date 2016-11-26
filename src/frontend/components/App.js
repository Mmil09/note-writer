import React from 'react';
import ButtonContainer from './ButtonContainer'
import ConfigContainer from './ConfigContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './TopBar'
import BottomBar from './BottomBar'

const SIZES = {
  normal: {
    width: 800,
    height: 600
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      size: {...SIZES.normal},
    }

    this.handlePositionChange = this._handlePositionChange.bind(this)
    this.handleScaleChange = this._handleScaleChange.bind(this)
    this.handleModeChange = this._handleModeChange.bind(this)
    this.handleOctaveChange = this._handleOctaveChange.bind(this)
    this.handleKeyChange = this._handleKeyChange.bind(this)
  }

  _handlePositionChange(newPosition) {
    this.props.noteWriter.trigger('position_change', newPosition)
  }

  _handleScaleChange(newScale) {
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
    let {size} = this.state
    let {config, noteButtons} = this.props;

    var style = {
      width: `${size.width}px`,
      height: `${size.height}px`
    }

    return (
      <MuiThemeProvider>
      	<div className="App" style={style}>
          
          <TopBar/>

          <div className="Middle">
            <ButtonContainer 
              noteButtons={noteButtons}
            />

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
          </div>

          <BottomBar/>
        
        </div>
      </MuiThemeProvider>
     
    );
  }
}
