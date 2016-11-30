'use strict';

var NoteButton = require('./noteButton')
var notes = require('./notes')
var scales = require('./scales')
var utils = require('./utils')
var getNoteNameFromValue = utils.getNoteNameFromValue
var getOffsetFromDegreeInScale = utils.getOffsetFromDegreeInScale
var isActionRequired = utils.isActionRequired;
var midi = require('./midi')
var midiNotes = midi.midiNotes

var eventListeners = {};
var eventListenerIndex = 0;

const defaultConfig = {
	octave: 5,
	position: -1, 
	mode: 0,
	scale: scales['major'],
	key: notes['C'],

	minPosition: 0,
	maxPosition: 7,
	minKey: 0,
	maxKey: 11,
	minOctave: 1,
	maxOctave: 8,
	primaryNoteButtonRange: [0, 7],
	bassNoteButtonRange: [8, 8],
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
		var numOfNoteButtons = 9;
		this.config = Object.assign({}, defaultConfig)
		this.previousConfig = {};
		this.noteButtons = [];
		this.setupInitialNoteButtons()
	}

	setupInitialNoteButtons() {
		for (var i = this.config.primaryNoteButtonRange[0]; i <= this.config.primaryNoteButtonRange[1]; i++) {		
			this.noteButtons[i] = new NoteButton()
		}

		for (var i = this.config.bassNoteButtonRange[0]; i <= this.config.bassNoteButtonRange[1]; i++) {
			this.noteButtons[i] = new NoteButton()
		}

		this.setNoteButtonValues()
	}

	setNoteButtonValues() {

		this.setNoteButtonValuesInRange(this.config.primaryNoteButtonRange[0], this.config.primaryNoteButtonRange[1], 0)
		this.setNoteButtonValuesInRange(this.config.bassNoteButtonRange[0], this.config.bassNoteButtonRange[1], -1)
	}

	setNoteButtonValuesInRange(startIndex, endIndex, octaveOffset) {
		var key = this.config.key,
		 octave = this.config.octave, 
		 position = this.config.position,
		 mode = this.config.mode,
		 scale = this.config.scale;
		 
		if (typeof octaveOffset === 'undefined') {
			octaveOffset = 0;
		}

		var degreeIndex, startValue

		degreeIndex = mode + position; //0 based degree
		startValue = key + ((octave + octaveOffset) * 12); //value assuming 0 offset/position

		for (var i = startIndex; i <= endIndex; i++) {
			var noteButton = this.noteButtons[i]
			var offset = getOffsetFromDegreeInScale(degreeIndex, scale)
			noteButton.noteValue = startValue + offset;
			noteButton.degreeIndex = degreeIndex - mode
			noteButton.degree = noteButton.degreeIndex + 1;
			if (noteButton.degree > scale.spacing.length) {

				var numOfScaleTraversals = Math.floor(noteButton.degree/(scale.spacing.length));
				var relativeDegreeIndex = noteButton.degree % (numOfScaleTraversals * scale.spacing.length)
				var relativeDegree = relativeDegreeIndex === 0 ? scale.spacing.length : relativeDegreeIndex
				noteButton.relativeDegree = relativeDegree
			}
			else {
				noteButton.relativeDegree = noteButton.degree
			}

			noteButton.noteDisplay = midiNotes[noteButton.noteValue]
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

		if (!isActionRequired.call(self, action, data)) {
			return
		}

		//check for note button actions
		switch(action) {
			case 'note_button_down':
				self.handleNoteButtonDown(data)
				return;

			case 'note_button_up':
				self.handleNoteButtonUp(data)
				return;
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
			case 'increment_position':
				this.handlePositionChange(this.config.position + 1)
				break;
			case 'decrement_position':
				this.handlePositionChange(this.config.position - 1)
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
				this.setNote(false, offNoteData, false)
				//trigger note on with new note
				this.setNote(true, onNoteData, false)
			}
		}

		notifyEventListeners('note_buttons_change', Object.assign([], this.noteButtons))
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
 * @param {boolean} notifyNoteButtonChange
 */
	setNote(on, noteData, notifyNoteButtonChange) {

		var shouldNotifyNoteButtonChange = notifyNoteButtonChange === false ? false : true;

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
			if (shouldNotifyNoteButtonChange) {
				notifyEventListeners('note_buttons_change', Object.assign([], this.noteButtons))
			}
			notifyEventListeners('note_on', noteData)
		}
		else {
			if (shouldNotifyNoteButtonChange) {
				notifyEventListeners('note_buttons_change', Object.assign([], this.noteButtons))
			}
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