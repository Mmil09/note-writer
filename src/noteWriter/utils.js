'use strict';

var _ = require('lodash')
var notes = require('./notes')

function getReverseScaleSpacing(scale) {
	var reverseSpacing = [];

	var descendingIndex = scale.spacing.length - 1
	var ascendingIndex = 0;

	while (descendingIndex >= 0) {
		reverseSpacing[ascendingIndex] = scale.intervalLength - scale.spacing[descendingIndex]
		ascendingIndex++;
		descendingIndex--;		
	}

	reverseSpacing.unshift(0)
	reverseSpacing.pop()

	return reverseSpacing
}

function getOffsetFromDegreeInScale(degreeIndex, scale) {
	var spacingLength = scale.spacingLength;
	var index = Math.abs(degreeIndex); //degreeIndex is zero based
	var absOffset, adjustedIndex, numOfScaleIntervals;
	var scaleSpacing = degreeIndex < 0 ? scale.spacingDescending : scale.spacingAscending
	//console.log(scaleSpacing)
	if (index < spacingLength) {
		absOffset = scaleSpacing[index]
	}
	else if (index % spacingLength >= 0) {
		numOfScaleIntervals = Math.floor(index/spacingLength)
		adjustedIndex = index % spacingLength
		absOffset = (scale.intervalLength * numOfScaleIntervals) + scaleSpacing[adjustedIndex]
	}

		if (degreeIndex < 0) {
			return -1 * absOffset
		}
		else {
			return absOffset
		}
}

function getDegreeFromDegreeIndex(degreeIndex, scale) {

	var adjustedAbsoluteDegree;
	var degree;

	console.log(degreeIndex)

	if (degreeIndex < 0) {
		adjustedAbsoluteDegree = degreeIndex + 1;
	}
	else {
		adjustedAbsoluteDegree = Math.abs(degreeIndex - 1)
	}

	if (adjustedAbsoluteDegree > scale.spacingLength) {
		var numOfScaleTraversals = Math.floor(adjustedAbsoluteDegree/(scale.spacingLength));
		degree = 2
	}
	else if (degreeIndex < 0) {
		degree = adjustedAbsoluteDegree = scale.spacingLength - adjustedAbsoluteDegree
	}
	else {
		degree = adjustedAbsoluteDegree
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
module.exports.getDegreeFromDegreeIndex = getDegreeFromDegreeIndex