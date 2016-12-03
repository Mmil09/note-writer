import React from 'react';
//import {ButtonGroup, Button, DropdownButton, Grid, Row, Col, MenuItem} from 'react-bootstrap/lib';
import Dropdown from 'react-dropdown'
import {DropDownMenu, MenuItem} from 'material-ui'
import {scales, notes, modes} from 'noteWriter'

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);

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

  _onSelect(configKey, e, index, value) {
    this.props.onConfigChange(configKey, value)
  }

  render() {

    var labelStyle = {color: '#fff'}

    return (
      <div className="TopBar">
        <DropdownContainer label="Scale">
          <DropDownMenu value={this.props.config.scale.name} onChange={this.onSelect.bind(this, 'scale')} labelStyle={{color: '#fff'}}>
            {this._getScaleMenuItems()}
          </DropDownMenu>
        </DropdownContainer>
        
        <DropdownContainer label="Key">
          <DropDownMenu value={this.props.config.key} onChange={this.onSelect.bind(this, 'key')} labelStyle={{color: '#fff'}}>
            {this._getKeyMenuItems()}
          </DropDownMenu>
        </DropdownContainer>
          
        
        <DropdownContainer label="Mode">
          <DropDownMenu value={this.props.config.mode} onChange={this.onSelect.bind(this, 'mode')} labelStyle={{color: '#fff'}}>
            {this._getModeMenuItems()}
          </DropDownMenu>
        </DropdownContainer>
        
        
        
      </div>
    );
  }

  // render() {

  //   return (
  //     <Toolbar className="TopBar" style={{backgroundColor: 'rgb(0, 188, 212)'}}>
  //        <ToolbarTitle color="#fff"/>

  //         <ToolbarGroup className="toolbar">
            
  //           <SelectField
  //             className="toolbar-select key"
  //             floatingLabelText="Key"
  //             value={this.props.config.key}
  //           >
  //             { this._getKeyMenuItems() }
  //           </SelectField>
  //           <SelectField
  //             className="toolbar-select scale"
  //             floatingLabelText="Scale"
  //             value={this.props.config.scale.name}
  //           >
  //             { this._getScaleMenuItems() }  
  //           </SelectField>

  //           <SelectField
  //             className="toolbar-select mode"
  //             floatingLabelText="Mode"
  //             value={this.props.config.mode}
  //           >
  //             { this._getModeMenuItems() }
  //           </SelectField>
          
  //         </ToolbarGroup>

  //     </Toolbar>
  //   );
  // }
}


const DropdownContainer = (props) => {
  let {
    label,
    children
  } = props


  return (
    <div className="DropdownContainer">
      <label>{label}</label>
      {children}
    </div>
  )
}
