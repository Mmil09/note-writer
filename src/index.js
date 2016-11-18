import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './stores/appStore'
import noteButton from './scripts/noteButton'
import NoteWriter from './scripts/noteWriter'

var midiFrequencies = getHertzFromMidiValue()
// store.subscribe(function() {
// 	render();
// })

// render()

// function render() {
// 	let state = store.getState() 
// 	ReactDOM.render(<App {...state}/>, document.getElementById('root'));
// } 


var keyCodeButtonIndexes = {
	72: 0,  //h degree 1 to start 
	74: 2, //j degree 3 to start
	75: 4, //k degree 5 to start
	76: 6, //l degree 7 to start
	85: 1, //u degree 4 to start
	73: 3, //i degree 6 to start
	79: 5, //o degree 8 to start
	80: 7, //p degree 8 to start
	16: 8, //shift, bass rote note
}

var keyCodePositionIndexes = {
	70: 0, //f key, position 1,
	68: 1, //d key, position 2,
	83: 2, //s key, position 3,
	65: 3, //a key, position 4,
	82: 4, //r key, position 5,
	69: 5, //e key, position 6,
	87: 6, //w key, position 7,
	81: 7, //q key, position 8,
}

var keyCodeOctaveIndexes = {
	49: 0, //1 key
	50: 1, //2 key
	51: 2, //3 key
	52: 3, //4 key
	53: 4, //5 key
	54: 5, //6 key
	55: 6, //7 key
	56: 7, //8 key
	57: 8, //9 key

	// 90: 1, //z key
	// 88: 2, //x key
	// 67: 3, //c key
	// 86: 4, //v key
	// 66: 5, //b key
	// 78: 6, //n key
	// 77: 7, //m key
}

const noteWriter = new NoteWriter();

document.addEventListener('keydown', function(e) {
	var buttonIndex = keyCodeButtonIndexes[e.keyCode]
	
	if (buttonIndex !== undefined) {
		noteWriter.trigger('note_button_down', buttonIndex)
	}

})

document.addEventListener('keydown', function(e) {
	var positionIndex = keyCodePositionIndexes[e.keyCode];

	if (positionIndex !== undefined) {
		console.log('position_change')
		noteWriter.trigger('position_change', positionIndex)
	}
})

document.addEventListener('keydown', function(e) {
	var octaveIndex = keyCodeOctaveIndexes[e.keyCode];
	console.log(octaveIndex)
	if (octaveIndex !== undefined) {
		console.log('octave_change')
		noteWriter.trigger('octave_change', octaveIndex)
	}
})

document.addEventListener('keyup', function(e) {
	var buttonIndex = keyCodeButtonIndexes[e.keyCode]
	var positionIndex = keyCodePositionIndexes[e.keyCode];

	if (buttonIndex !== undefined) {
		noteWriter.trigger('note_button_up', buttonIndex)
		return;
	}

})



window.AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();

var masterGain = context.createGain();
masterGain.gain.value = 0.3;
masterGain.connect(context.destination); 

let oscillators = {}

function getNewOscillator() {
	var oscillator = context.createOscillator();
	oscillator.type = 'sawtooth';
	oscillator.connect(masterGain);
	return oscillator
}

var unsubscribeNoteOn = noteWriter.on('note_on', function(noteValue, noteButtonIndex, data) {
	console.log('note on called', noteValue, noteButtonIndex)
	oscillators[noteButtonIndex] = getNewOscillator()
	oscillators[noteButtonIndex].frequency.value = midiFrequencies[noteValue];
	oscillators[noteButtonIndex].start(0);
})

var unsubscribeNoteOff = noteWriter.on('note_off', function(noteValue, noteButtonIndex, data) {
	// console.log('note_off called', noteValue, noteButtonIndex)
	oscillators[noteButtonIndex].stop(0);
})

var unsubscribePositionChange = noteWriter.on('position_change', function(newPosition) {
	// console.log('new position received', newPosition)
})

function getHertzFromMidiValue() {
	var midi = {}
	var a = 440

	for (var x = 0; x < 127; x++) {
		var exp = (x - 69)/12
	  midi[x] = Math.pow(2, exp) * a
	}

	return midi;
}


getHertzFromMidiValue()



