
const midiFrequencies = function getHertzFromMidiValue() {
	var midi = {}
	var a = 440

	for (var x = 0; x < 127; x++) {
		var exp = (x - 69)/12
	  midi[x] = Math.pow(2, exp) * a
	}

	return midi;
}()

const listenEvents = (socket) => {

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	var context = new AudioContext();

	var masterGain = context.createGain();
	masterGain.gain.value = 0.3;
	masterGain.connect(context.destination); 

	var oscillators = {}

	function getNewOscillator() {
		var oscillator = context.createOscillator();
		oscillator.type = 'sawtooth';
		oscillator.connect(masterGain);
		return oscillator
	}

	socket.on('note_on', function(data) {
		// console.log('note on called', data)
		playOscillator(data)
	})

	socket.on('note_off', function(data) {
		// console.log('note off called', data)
		stopOscillator(data)
	})
}

function playOscillator(data) {
	return;
	oscillators[data.noteButtonIndex] = getNewOscillator()
	oscillators[data.noteButtonIndex].frequency.value = midiFrequencies[data.noteValue];
	oscillators[data.noteButtonIndex].start(0);
}

function stopOscillator(data) {
	return;
	if (oscillators[data.noteButtonIndex]) {
		oscillators[data.noteButtonIndex].stop(0);
	}
}

export default listenEvents

