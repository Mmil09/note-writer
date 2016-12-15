import React from 'react';
//import {ButtonGroup, Button, DropdownButton, Grid, Row, Col, MenuItem} from 'react-bootstrap/lib';
import {DropDownMenu, Menu, MenuItem, Popover, FlatButton, Slider, List, ListItem, Subheader, Toggle} from 'material-ui'
import Arrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
import {scales, notes, modes} from 'noteWriter'

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    }

    this.onSelect = this._onSelect.bind(this)
  }

  _getScaleMenuItems() {
    var scaleLabels = Object.keys(scales);

    var scaleMenuItems = scaleLabels.map((scaleLabel, index) => {
      
      let scale = scales[scaleLabel]
      
      return (
        <MenuItem value={scale.name} key={index} primaryText={scale.name} />
      )

      return {value: scaleLabel, label: scaleLabel } 
    })

    return scaleMenuItems
  }

  _getKeyMenuItems() {
    var noteLabels = Object.keys(notes);

    var keyMenuItems = noteLabels.map((noteLabel, index) => {
      
      let note = notes[noteLabel]
      
      return (
        <MenuItem value={note} key={index} primaryText={noteLabel} />
      )

      return {value: index, label: noteLabel }
    })

    return keyMenuItems
  }

  _getModeMenuItems() {
    var modeLabels = Object.keys(modes);

    var modeMenuItems = this.props.config.scale.spacing.map( (degree, index) => {
      return (
        <MenuItem value={index} key={index} primaryText={index + 1}/>
      )    

      return {value: index, label: String(index + 1) } 
    })

    return modeMenuItems
  }

  _getOctaveMenuItems() {
    var octaveMenuItems = [];

    for (var index = this.props.config.minOctave; index <= this.props.config.maxOctave; index++) {
      octaveMenuItems.push(<MenuItem value={index} key={index} primaryText={index + 1}/>)
    }

    return octaveMenuItems
  }

  _onSelect(configKey, e, value) {
    this.props.onConfigChange(configKey, value)
  }

  _handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  _handleSynthEnabledToggle(e, newValue) {
    this.props.onSynthSettingsChange({
      ...this.props.synthSettings,
      enabled: newValue,
    })
  }

  _renderSynthToggle() {

    return (
      <Toggle 
        toggled={this.props.synthSettings.enabled} 
        onToggle={this._handleSynthEnabledToggle.bind(this)}
      />
    )
    
  }



  render() {

    var noteLabels = Object.keys(notes);

    return (
      <div className="TopBar">
        <DropdownContainer label="Scale" currentValue={this.props.config.scale.name}>
          <Menu value={this.props.config.scale.name} onChange={this.onSelect.bind(this, 'scale')}>
            {this._getScaleMenuItems()}
          </Menu>
        </DropdownContainer>
        
        <DropdownContainer label="Key" currentValue={noteLabels[this.props.config.key]}>
          <Menu value={this.props.config.key} onChange={this.onSelect.bind(this, 'key')}>
            {this._getKeyMenuItems()}
          </Menu>
        </DropdownContainer>
          
        
        <DropdownContainer label="Mode" currentValue={this.props.config.mode + 1}>
          <Menu value={this.props.config.mode} onChange={this.onSelect.bind(this, 'mode')}>
            {this._getModeMenuItems()}
          </Menu>
        </DropdownContainer>

        <DropdownContainer label="Octave" currentValue={this.props.config.octave + 1}>
          <Menu value={this.props.config.octave} onChange={this.onSelect.bind(this, 'octave')}>
            {this._getOctaveMenuItems()}
          </Menu>
        </DropdownContainer>   

        <DropdownContainer label="Velocity" currentValue={String(this.props.velocity + ' +/- ' + this.props.velocityVariance)}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '200px', height: '300px'}}>
            <Slider style={{height: 200}} axis="y" min={0} max={127} onChange={this.props.onVelocityChange} step={1} value={this.props.velocity}/>
            <Slider style={{height: 200}} axis="y" min={0} max={50} onChange={this.props.onVelocityVarianceChange} step={1} value={this.props.velocityVariance} />
          </div> 
        </DropdownContainer>

        <DropdownContainer label="Synth">
          <List style={{width: '400px'}}>
            <ListItem primaryText="Enabled" rightToggle={this._renderSynthToggle()}/>
            <Subheader>Volume</Subheader>
            <ListItem style={{paddingTop: '0px', paddingBottom: '0px'}} rightToggle={<label>50</label>}>
              <Slider sliderStyle={{marginTop: '0px', marginBottom: '0px'}}  min={0} max={50}/>
            </ListItem>
          </List>
        </DropdownContainer>  

       
        
        
      </div>
    );
  }
}


class DropdownContainer extends React.Component {
  

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null,
    }
    this.handleTouchTap = this._handleTouchTap.bind(this)
    this.handleRequestClose = this._handleRequestClose.bind(this)
  }

  _handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  _handleRequestClose(){
    this.setState({
      open: false,
    });
  }


  render() {
    let {label,children, currentValue} = this.props

    return (
      <div className="DropdownContainer">
        <div className="dropdown-label">{label}</div>
        <FlatButton className="dropdown-button" onTouchTap={this.handleTouchTap}>{currentValue}<Arrow/></FlatButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          {children}
        </Popover>
      </div>
    )    
  }

}
