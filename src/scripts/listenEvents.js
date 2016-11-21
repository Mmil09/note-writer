
const midiFrequencies = function getHertzFromMidiValue() {
	var midi = {}
	var a = 440

	for (var x = 0; x < 127; x++) {
		var exp = (x - 69)/12
	  midi[x] = Math.pow(2, exp) * a
	}

	return midi;
}()

const listenEvents = (noteWriter) => {

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
		// console.log('note on called', noteValue, noteButtonIndex)
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
}

export default listenEvents

