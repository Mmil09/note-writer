
const midiFrequencies = function getHertzFromMidiValue() {
	var midi = {}
	var a = 440

	for (var x = 0; x < 127; x++) {
		var exp = (x - 69)/12
	  midi[x] = Math.pow(2, exp) * a
	}

	return midi;
}()

var numOfOctaves = 12;

var midiNotes = {}

for (var octave = 0; octave < numOfOctaves; octave++) {
	for (var value = 0; value < 12; value++) {
		var note;
		
		switch(value) {
			case 0:
				note = 'C'
				break;
			case 1:
				note = 'C#'
				break;
			case 2:
				note = 'D'
				break;
			case 3:
				note = 'D#'
				break;
			case 4:
				note = 'E'
				break;
			case 5:
				note = 'F'
				break;
			case 6:
				note = 'F#'
				break;
			case 7:
				note = 'G'
				break;
			case 8:
				note = 'G#'
				break;
			case 9:
				note = 'A'
				break;
			case 10:
				note = 'A#'
				break;
			case 11:
				note = 'B'
				break;
		}

		var index = (octave * 12) + value
		midiNotes[index] = note + octave
	}
}

module.exports.midiNotes = midiNotes