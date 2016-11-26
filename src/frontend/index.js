const socket = io(SOCKET_URL);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import keyboardBindings from './scripts/keyboardBindings'
keyboardBindings(socket)
import synth from './scripts/synth'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let currentNoteButtons = INITIAL_NOTE_BUTTONS,
		currentConfig = INITIAL_CONFIG,
		currentSynthSettings = {
			enabled: true,
			type: 'sawtooth',
		}


socket.on('note_buttons_change', function(noteButtons) {
	currentNoteButtons = noteButtons
	renderApp()
})

socket.on('config_change', function(config) {
	currentConfig = config
	renderApp()
})

socket.on('note_on', function(noteData) {
	if (currentSynthSettings.enabled) {
		synth.playOscillator(noteData)
	}
	
})

socket.on('note_off', function(noteData) {
	if (currentSynthSettings.enabled) {
		synth.stopOscillator(noteData)
	}
})


function renderApp() {
	ReactDOM.render(
		<App
			synthSettings={currentSynthSettings} 
			config={currentConfig}
			noteButtons={currentNoteButtons}
      onScaleChange={handleScaleChange}
      onPositionChange={handlePositionChange}
      onModeChange={handleModeChange}
      onKeyChange={handleKeyChange}
      onOctaveChange={handleOctaveChange}
      onToggleSynth={handleToggleSynth}
		/>, 
		document.getElementById('root'));
}

function handlePositionChange(newPosition) {
  socket.emit('position_change', newPosition)
}

function handleScaleChange(newScale) {
  socket.emit('scale_change', newScale)
}

function handleModeChange(newMode) {
  socket.emit('mode_change', newMode)
}

function handleOctaveChange(newOctave) {
  socket.emit('octave_change', newOctave)
}

function handleKeyChange(newKey) {
  socket.emit('key_change', newKey)
}

function handleToggleSynth() {
	currentSynthSettings.enabled = !currentSynthSettings.enabled;
	
	if (!currentSynthSettings.enabled) {
		synth.stopAllOscillators()
	}

	renderApp()
}





