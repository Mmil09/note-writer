'use strict';

var notes = require('./notes')

function getOffsetFromDegreeInScale(degreeIndex, scale) {
	var spacingLength = scale.spacingLength;
	var index = Math.abs(degreeIndex); //degreeIndex is zero based
	var absOffset, adjustedIndex, numOfScaleTraversals;
	var scaleSpacing = degreeIndex < 0 ? scale.spacingDescending : scale.spacingAscending
	//console.log(scaleSpacing)
	if (index < spacingLength) {
		absOffset = scaleSpacing[index]
	}
	else if (index % spacingLength >= 0) {
		numOfScaleTraversals = Math.floor(index/spacingLength)
		adjustedIndex = index % spacingLength
		absOffset = (scale.intervalLength * numOfScaleTraversals) + scaleSpacing[adjustedIndex]
	}

		if (degreeIndex < 0) {
			return -1 * absOffset
		}
		else {
			return absOffset
		}
}

function relativeDegreeFromDegreeIndex(degreeIndex, scale) {
	var absoluteDegreeIndex = Math.abs(degreeIndex)
	var numOfScaleTraversals = Math.floor(absoluteDegreeIndex/scale.spacingLength)
	var adjustedDegree = absoluteDegreeIndex - (numOfScaleTraversals * scale.spacingLength)
	
	var degree;

	if (adjustedDegree === 0) {
		degree = 1
	}
	else if (degreeIndex < 0) {
		degree = (scale.spacingLength - adjustedDegree) + 1
	} 
	else {
		degree = adjustedDegree + 1
	}
	
	return degree
}

function isActionRequired(action, data) {
	//check for cases that do not require any action
	switch(action) {
		case 'key_change':
			if (this.config.key === data) {
				return false;
			}
			break;
		case 'scale_change':
			if (this.config.scale.name === data) {
				return false;
			}
			break;
		case 'octave_change':
			if (this.config.octave === data) {
				return false;
			}
			break;
		case 'position_change':
			if (this.config.position === data) {
				return false;
			}
			break;
		case 'mode_change':
			if (this.config.mode === data) {
				return false;
			}
			break;
		case 'increment_key':
			if (this.config.key + 1 > this.config.maxKey) {
				return false;
			}
			break;
		case 'decrement_key':
			if (this.config.key - 1 < this.config.minKey) {
				return false;
			}
			break;
		case 'increment_octave':
			if (this.config.octave + 1 > this.config.maxOctave) {
				return false;
			}
			break;
		case 'decrement_octave':
			if (this.config.octave - 1 < this.config.minOctave) {
				return false;
			}
			break;
		case 'increment_position':
			//TODO: check for cases that are invalid/do not require action
			return true;
			break;
		case 'decrement_position':
			//TODO: check for cases that are invalid/do not require action
			return true;
			break;
	}

	return true;
}

module.exports.getOffsetFromDegreeInScale = getOffsetFromDegreeInScale
module.exports.isActionRequired = isActionRequired
module.exports.relativeDegreeFromDegreeIndex = relativeDegreeFromDegreeIndex