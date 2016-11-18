import notes from './notes'
// module.exports.eachLoop = function(startIndex = 0, loopLength = 0, callback) {
	
// 	let index = startIndex;
// 	let value;
// 	let lastIndex = this.length - 1

// 	for (var loopInstance = 0; loopInstance < loopLength; loopInstance++) {

// 		let adjustedIndex;

// 		if (index <= lastIndex) {
// 			adjustedIndex = index;
// 		}
// 		else if (index > lastIndex) {
// 			adjustedIndex = index % this.length;	
// 		}

// 		// console.log('adjustedIndex', adjustedIndex)

// 		value = this[adjustedIndex]

// 		if (callback) {
// 			callback(value, loopInstance, this)
// 		}
		
// 		index++;
// 	}
// }

// module.exports.getValueInArray = function(index, array) {
// 	let value;
// 	let lastIndex = array.length - 1;

// 	if (index <= lastIndex) {
// 		value = array[index]
// 	}
// 	else if (index > lastIndex) {
// 		let adjustedIndex = index % array.length;
// 		value = array[adjustedIndex]
// 	}
// }


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