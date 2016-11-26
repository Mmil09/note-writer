
const midiFrequencies = function getHertzFromMidiValue() {
	var midi = {}
	var a = 440

	for (var x = 0; x < 127; x++) {
		var exp = (x - 69)/12
	  midi[x] = Math.pow(2, exp) * a
	}

	return midi;
}()

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const masterGain = context.createGain();
masterGain.gain.value = 0.3;
masterGain.connect(context.destination); 

const oscillators = {}

function getNewOscillator() {
	var oscillator = context.createOscillator();
	oscillator.type = 'sawtooth';
	oscillator.connect(masterGain);
	return oscillator
}

function playOscillator(noteData) {
	oscillators[noteData.noteButtonIndex] = getNewOscillator()
	oscillators[noteData.noteButtonIndex].frequency.value = midiFrequencies[noteData.noteValue];
	oscillators[noteData.noteButtonIndex].start(0);
}

function stopOscillator(noteData) {
	if (oscillators[noteData.noteButtonIndex]) {
		oscillators[noteData.noteButtonIndex].stop(0);
	}
}

function stopAllOscillators() {
	let keys = Object.keys(oscillators)

	keys.forEach(key => {
		let oscillator = oscillators[key];
		oscillator.stop(0);
	})
}

module.exports = {
	playOscillator: playOscillator,
	stopOscillator: stopOscillator,
	stopAllOscillators: stopAllOscillators,
}

