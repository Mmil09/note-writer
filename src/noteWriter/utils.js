'use strict';

var notes = require('./notes')

function getNoteNameFromValue(value, octave, offset) {
	const greatestNoteValue = notes['B'];
	
	if (offset >= 12) {
		octave += Math.floor(offset/12)
	}

	value -= octave * 12

	if (value > greatestNoteValue) {
		value -= greatestNoteValue + 1
	}

	var noteNames = Object.keys(notes)
	
	var name = noteNames.filter((noteName) => {
		return value === notes[noteName]
	})[0]

	if (name) {
		return name
	}
	else {
		return 'N/A'
	}	
}

function getOffsetFromDegreeInScale(degree, scale) {
	const spacingLength = scale.spacing.length;
	var index = degree; //degree is zero based

	if (index < spacingLength) {
		return scale.spacing[index]
	}
	else if (index % spacingLength >= 0) {
		let octaveOffset = Math.floor(index/spacingLength)
		let adjustedIndex = index % spacingLength

		return (12 * octaveOffset) + scale.spacing[adjustedIndex]
	}
}



module.exports.getNoteNameFromValue = getNoteNameFromValue
module.exports.getOffsetFromDegreeInScale = getOffsetFromDegreeInScale