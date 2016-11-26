'use strict';

var NoteButton = require('./noteButton')
var notes = require('./notes')
var scales = require('./scales')
var utils = require('./utils')
var getNoteNameFromValue = utils.getNoteNameFromValue
var getOffsetFromDegreeInScale = utils.getOffsetFromDegreeInScale

var eventListeners = {};
var eventListenerIndex = 0;
var numOfNoteButtons = 9;
var primaryNoteButtonRange = [0, 7]
var bassNoteButtonRange = [8, 8];

const defaultConfig = {
	octave: 5,
	position: 0, 
	mode: 0,
	scale: scales['major'],
	key: notes['C'],

	minPosition: 0,
	maxPosition: 7,
	minKey: 0,
	maxKey: 11,
	minOctave: 1,
	maxOctave: 8,

}

function valueIsInRange(value, range) {
	return value >= range[0] && value <= range[1]
}

function notifyEventListeners(eventType, data) {
	var eventListenerIndexes = Object.keys(eventListeners)

	eventListenerIndexes.forEach(listenerIndex => {
		let listener = eventListeners[listenerIndex]
		
		if (listener.type === eventType) {
			listener.callback(data)
		}
	})
}

class NoteWriter {

	constructor(options) {
		this.config = Object.assign({}, defaultConfig)
		this.previousConfig = {};
		this.noteButtons = new Array(numOfNoteButtons);
		this.setupInitialNoteButtons()
	}

	setupInitialNoteButtons() {
		for (var i = 0; i < this.noteButtons.length; i++) {
			this.noteButtons[i] = new NoteButton()
		}

		this.setNoteButtonValues()
	}

	setNoteButtonValues() {
		var key = this.config.key,
		 octave = this.config.octave, 
		 position = this.config.position,
		 mode = this.config.mode,
		 scale = this.config.scale;

		var degreeIndex, startValue

		degreeIndex = mode + position; //0 based degree
		startValue = key + (octave * 12); //value assuming 0 offset/position

		for (var i = primaryNoteButtonRange[0]; i <= primaryNoteButtonRange[1]; i++) {
			var noteButton = this.noteButtons[i]
			var offset = getOffsetFromDegreeInScale(degreeIndex, scale)
			noteButton.noteValue = startValue + offset;
			noteButton.degreeIndex = degreeIndex
			noteButton.degree = degreeIndex + 1;
			noteButton.noteDisplay = getNoteNameFromValue(noteButton.noteValue, octave, offset)
			degreeIndex++;			
		}

		degreeIndex = mode + position; //0 based degree
		startValue = key + ((octave - 1) * 12); //value assuming 0 offset/position

		for (var i = bassNoteButtonRange[0]; i <= bassNoteButtonRange[1]; i++) {
			var noteButton = this.noteButtons[i]
			var offset = getOffsetFromDegreeInScale(degreeIndex, scale)
			noteButton.noteValue = startValue + offset;
			noteButton.degreeIndex = degreeIndex
			noteButton.degree = degreeIndex + 1;
			noteButton.noteDisplay = getNoteNameFromValue(noteButton.noteValue, (octave - 1), offset)
			degreeIndex++;
		}

	}

	on(event, callback) {

		eventListeners[eventListenerIndex] = {type: event, callback: callback}
		
		var indexToDelete = JSON.parse(JSON.stringify(eventListenerIndex))

		var unsubscribe = function(index) {
			delete eventListeners[index]
		}.bind(null, indexToDelete)

		eventListenerIndex++;

		return unsubscribe;
	}

	trigger(action, data) {
		var self = this;

		//check for note button actions
		switch(action) {
			case 'note_button_down':
				self.handleNoteButtonDown(data)
				return;

			case 'note_button_up':
				self.handleNoteButtonUp(data)
				return;
		}

		//check for cases that do not require any action
		switch(action) {
			case 'key_change':
				if (this.config.key === data) {
					return;
				}
				break;
			case 'scale_change':
				if (this.config.scale.name === data) {
					return;
				}
				break;
			case 'octave_change':
				if (this.config.octave === data) {
					return;
				}
				break;
			case 'position_change':
				if (this.config.position === data) {
					return;
				}
				break;
			case 'mode_change':
				if (this.config.mode === data) {
					return;
				}
				break;
			case 'increment_key':
				if (this.config.key + 1 > this.config.maxKey) {
					return;
				}
				break;
			case 'decrement_key':
				if (this.config.key - 1 < this.config.minKey) {
					return;
				}
				break;
			case 'increment_octave':
				if (this.config.octave + 1 > this.config.maxOctave) {
					return;
				}
				break;
			case 'decrement_octave':
				if (this.config.octave - 1 < this.config.minOctave) {
					return;
				}
				break;
		}


		this.savePreviousConfigAndButtons();

		switch(action) {

			case 'key_change':
				this.handleKeyChange(data)
				break;
			case 'scale_change':
				this.handleScaleChange(data)
				break;
			case 'octave_change':
				this.handleOctaveChange(data)
				break;
			case 'position_change':
				this.handlePositionChange(data)
				break;
			case 'mode_change':
				this.handleModeChange(data)
				break;
			case 'increment_key':
				this.handleKeyChange(this.config.key + 1)
				break;
			case 'decrement_key':
				this.handleKeyChange(this.config.key - 1)
				break;
			case 'increment_octave':
				this.handleOctaveChange(this.config.octave + 1)
				break;
			case 'decrement_octave':
				this.handleOctaveChange(this.config.octave - 1)
				break;
		}

		this.setNoteButtonValues();
		this.setNoteButtonsAfterConfigChange();
	}

	savePreviousConfigAndButtons() {
		this.previousConfig = Object.assign({}, this.config)
		this.previousNoteButtons = this.noteButtons.map(function(noteButton) {
			return Object.assign({}, noteButton)
		})
	}

	handlePositionChange(newPosition) {
		this.config.position = newPosition;
		notifyEventListeners('position_change', newPosition)
	}

	handleScaleChange(newScaleName) {
		var newScale = scales[newScaleName]
		this.config.scale = newScale;
		notifyEventListeners('scale_change', newScale)
	}

	handleModeChange(newMode) {
		this.config.mode = newMode;
		notifyEventListeners('mode_change', newMode)
	}

	handleKeyChange(newKey) {
		this.config.key = newKey;
		notifyEventListeners('key_change', newKey)		
	}

	handleOctaveChange(newOctave) {
		this.config.octave = newOctave;
		notifyEventListeners('octave_change', newOctave)
	}

	setNoteButtonsAfterConfigChange() {
		var self = this;

		notifyEventListeners('config_change', Object.assign({}, this.config))

		for (var i = 0; i < this.noteButtons.length; i++) {
			var noteButton = this.noteButtons[i]
			if (noteButton.isPushed) {
				var noteButtonIndex = i
				var offNoteButton = self.previousNoteButtons[i];
				var noteButton = self.noteButtons[i];
				
				var offNoteData = Object.assign({}, offNoteButton, {noteButtonIndex: i})
				var onNoteData = Object.assign({}, noteButton, {noteButtonIndex: i})
				
				//trigger note off
				this.setNote(false, offNoteData)
				//trigger note on with new note
				this.setNote(true, onNoteData)
			}
		}
	}

/**
 * Handle note button down trigger
 * @param {Object} data
 * @param {number} data.channel
 * @param {number} data.velocity
 * @param {number} data.noteButtonIndex
 */
	handleNoteButtonDown(data) {
		var noteButtonIndex = data.noteButtonIndex
		var noteButton = this.noteButtons[noteButtonIndex]
		
		var noteData = Object.assign({}, noteButton, data)

		if (noteButton.isPushed) {
			// console.log('already pushed, do nothing')
		}
		else {
			noteButton.isPushed = true
			noteButton.velocity = data.velocity
			noteButton.channel = data.channel
			this.setNote(true, noteData)
		}
		
	}

/**
 * Handle note button up trigger
 * @param {Object} data
 * @param {number} data.channel
 * @param {number} data.velocity
 * @param {number} data.noteButtonIndex
 */
	handleNoteButtonUp(data) {
		var noteButtonIndex = data.noteButtonIndex
		var noteButton = this.noteButtons[noteButtonIndex]
		
		var noteData = Object.assign({}, noteButton, data)
		
		if (!noteButton.isPushed) {
			// console.log('already released, do nothing')
		}
		else {
			noteButton.isPushed = false
			noteButton.velocity = data.velocity
			noteButton.channel = data.channel
			this.setNote(false, noteData)
		}
	}

/**
 * Set note on or off
 * @param {boolean} on
 * @param {Object} noteData
 * @param {number} noteData.noteButtonIndex
 * @param {number} noteData.degreeIndex
 * @param {number} noteData.degree
 * @param {number} noteData.noteValue
 * @param {number} noteData.channel
 * @param {number} noteData.velocity
 * @param {string} noteData.noteDisplay
 */
	setNote(on, noteData) {
		var requiredKeys = [
			'noteButtonIndex',
			'degreeIndex',
			'degree',
			'noteValue',
			'channel',
			'velocity',
			'noteDisplay', 
		]

		requiredKeys.forEach(function(key) {
			if (noteData[key] === undefined || noteData[key] === null) {
				throw new Error('Required noteData key missing: ' + key)
			}
		})		
		
		if (on) {
			notifyEventListeners('note_buttons_change', Object.assign([], this.noteButtons))
			notifyEventListeners('note_on', noteData)
		}
		else {
			notifyEventListeners('note_buttons_change', Object.assign([], this.noteButtons))
			notifyEventListeners('note_off', noteData)	
		}
	}

	getConfig() {
		return Object.assign({}, this.config)
	}

	getNoteButtons() {
		return Object.assign([], this.noteButtons)
	}

}


module.exports = NoteWriter