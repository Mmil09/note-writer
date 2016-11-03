import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './stores/appStore'
import noteButton from './scripts/noteButton'
import NoteWriter from './scripts/noteWriter'

// store.subscribe(function() {
// 	render();
// })

// render()

// function render() {
// 	let state = store.getState() 
// 	ReactDOM.render(<App {...state}/>, document.getElementById('root'));
// } 


var keyCodeButtonIndexes = {
	74: 0, //j degree 1 to start 
	85: 1, //u degree 2 to start
	75: 2, //k degree 3 to start
	73: 3, //i degree 4 to start
	76: 4, //l degree 5 to start
	79: 5, //o degree 6 to start
	186: 6, //; degree 7 to start
	80: 7, //p degree 8 to start
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

const noteWriter = new NoteWriter();

document.addEventListener('keydown', function(e) {
	var buttonIndex = keyCodeButtonIndexes[e.keyCode]
	var positionIndex = keyCodePositionIndexes[e.keyCode];
	
	if (buttonIndex !== undefined) {
		noteWriter.trigger('note_button_down', {
			buttonIndex: buttonIndex
		})
	}
	else if (positionIndex !== undefined) {
		// store.dispatch({type: 'CONFIG_CHANGE', data: {position: positionIndex}})
		return;
	}

})

document.addEventListener('keyup', function(e) {
	var buttonIndex = keyCodeButtonIndexes[e.keyCode]
	var positionIndex = keyCodePositionIndexes[e.keyCode];

	if (buttonIndex !== undefined) {
		noteWriter.trigger('note_button_up', {
			buttonIndex: buttonIndex
		})
		return;
	}

})

var unsubscribe = noteWriter.on('note_on', function(noteValue, noteData) {
	console.log('listener called')
})

setTimeout(function() {
	unsubscribe()
}, 4000)






// window.AudioContext = window.AudioContext || window.webkitAudioContext;

// var context = new AudioContext();

// var masterGain = context.createGain();
// masterGain.gain.value = 0.3;
// masterGain.connect(context.destination); 

// var oscillator = context.createOscillator();
// oscillator.type = 'square';
// oscillator.frequency.value = 440;
// oscillator.connect(masterGain);
// oscillator.start(0);


// setTimeout(function() {
// 	oscillator.stop(0)
// }, 4000)




