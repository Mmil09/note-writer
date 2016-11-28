import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Slider from 'material-ui/Slider';
import Popover from 'material-ui/Popover';
import SelectField from 'material-ui/SelectField';

import {scales, notes, modes} from 'noteWriter'

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);

  }

  _getScaleMenuItems() {
    var scaleLabels = Object.keys(scales);

    var scaleMenuItems = scaleLabels.map((scaleLabel, index) => {
      
      let scale = scales[scaleLabel]
      
      return (
        <MenuItem value={scale.name} key={index} primaryText={scale.name} />
      )
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
    })

    return keyMenuItems
  }

  _getModeMenuItems() {
    var modeLabels = Object.keys(modes);

    var modeMenuItems = modeLabels.map((modeLabel, index) => {
      
      let mode = modes[modeLabel]
      
      return (
        <MenuItem value={mode} key={index} primaryText={modeLabel + '(+' + mode + ')'} />
      )
    })

    return modeMenuItems
  }

  render() {

    return (
      <Toolbar className="TopBar" style={{backgroundColor: 'rgb(0, 188, 212)'}}>
         <ToolbarTitle text="Note Writer" color="#fff"/>

          <ToolbarGroup>
            
            <SelectField
              floatingLabelText="Key"
              value={this.props.config.key}
            >
              { this._getKeyMenuItems() }
            </SelectField>
            <SelectField
              floatingLabelText="Scale"
              value={this.props.config.scale.name}
            >
              { this._getScaleMenuItems() }  
            </SelectField>

            <SelectField
              floatingLabelText="Mode"
              value={this.props.config.mode}
            >
              { this._getModeMenuItems() }
            </SelectField>
          
          </ToolbarGroup>

      </Toolbar>
    );
  }
}



/*

          <ToolbarGroup>
            <IconButton onTouchTap={this.handleTouchTap}>
              <NavigationExpandMoreIcon />
            </IconButton>
            <Popover
              open={this.state.menuOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Slider step={0.10} value={0.5} />

            </Popover>
          </ToolbarGroup>

*/