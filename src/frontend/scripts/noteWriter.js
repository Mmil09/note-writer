import NoteButton from './noteButton'
import notes from './notes'
import scales from './scales'
import {getNoteNameFromValue, getOffsetFromDegreeInScale} from './utils'

const eventListeners = {};
let eventListenerIndex = 0;

const numOfNoteButtons = 9;
const defaultPosition = 0;
const defaultKey = notes['C'];
const defaultScale = scales['major']
const defaultOctave = 4;
const defaultMode = 0;

const primaryNoteButtonRange = [0, 7]
const bassNoteButtonRange = [8, 8];

const defaultConfig = {
	octave: defaultOctave,
	position: defaultPosition, 
	mode: defaultMode,
	scale: defaultScale,
	key: defaultKey,		
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

export default class NoteWriter {

	constructor(options = {}) {
		this.config = {...defaultConfig}
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
		let {key, octave, position, mode, scale} = this.config;

		var degree = mode + position; //0 based degree
		var startValue = key + (octave * 12); //value assuming 0 offset/position

		for (var i = primaryNoteButtonRange[0]; i <= primaryNoteButtonRange[1]; i++) {
			let noteButton = this.noteButtons[i]
			let offset = getOffsetFromDegreeInScale(degree, scale)
			noteButton.value = startValue + offset;
			noteButton.degreeDisplay = degree + 1;
			noteButton.noteDisplay = getNoteNameFromValue(noteButton.value, octave, offset)
			degree++;			
		}

		var degree = mode + position; //0 based degree
		var startValue = key + ((octave - 1) * 12); //value assuming 0 offset/position

		for (var i = bassNoteButtonRange[0]; i <= bassNoteButtonRange[1]; i++) {
			let noteButton = this.noteButtons[i]
			let offset = getOffsetFromDegreeInScale(degree, scale)
			noteButton.value = startValue + offset;
			noteButton.degreeDisplay = degree + 1;
			noteButton.noteDisplay = getNoteNameFromValue(noteButton.value, (octave - 1), offset)
			degree++;
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

	trigger(action, value) {
		var self = this;

		
	
		switch(action) {
			case 'note_button_down':
				self.handleNoteButtonDown(value)
				return;

			case 'note_button_up':
				self.handleNoteButtonUp(value)
				return;
		}

		switch(action) {
			case 'key_change':
				if (this.config.key === value) {
					return;
				}
				break;
			case 'scale_change':
				if (this.config.scale.name === value) {
					return;
				}
				break;
			case 'octave_change':
				if (this.config.octave === value) {
					return;
				}
				break;
			case 'position_change':
				if (this.config.position === value) {
					return;
				}
				break;
			case 'mode_change':
				if (this.config.mode === value) {
					return;
				}
				break;
		}


		this.savePreviousConfigAndButtons();

		switch(action) {

			case 'key_change':
				this.handleKeyChange(value)
				break;
			case 'scale_change':
				this.handleScaleChange(value)
				break;
			case 'octave_change':
				this.handleOctaveChange(value)
				break;
			case 'position_change':
				this.handlePositionChange(value)
				break;
			case 'mode_change':
				this.handleModeChange(value)
				break;
		}

		this.setNoteButtonValues();
		this.setNoteButtonsAfterConfigChange();
	}

	savePreviousConfigAndButtons() {
		this.previousConfig = {...this.config}
		this.previousNoteButtons = [...this.noteButtons]
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

		notifyEventListeners('config_change', {...this.config})

		for (var i = 0; i < this.noteButtons.length; i++) {
			var noteButton = this.noteButtons[i]
			if (noteButton.isPushed) {
				let noteButtonIndex = i
				let offNoteValue = self.previousNoteButtons[i].value
				let onNoteValue = self.noteButtons[i].value;
				//trigger note off
				this.setNoteOff(offNoteValue, noteButtonIndex)
				//trigger note on with new note
				this.setNoteOn(onNoteValue, noteButtonIndex)
			}
		}
	}

	handleNoteButtonDown(noteButtonIndex, data = {}) {

		var noteButton = this.noteButtons[noteButtonIndex]

		if (noteButton.isPushed) {
			// console.log('already pushed, do nothing')
		}
		else {
			var noteButton = this.noteButtons[noteButtonIndex];
			noteButton.isPushed = true
			this.setNoteOn(noteButton.value, noteButtonIndex, data)
		}
		
	}

	handleNoteButtonUp(noteButtonIndex, data = {}) {

		var noteButton = this.noteButtons[noteButtonIndex]
		
		if (!noteButton.isPushed) {
			// console.log('already released, do nothing')
		}
		else {
			var noteButton = this.noteButtons[noteButtonIndex];
			noteButton.isPushed = false
			this.setNoteOff(noteButton.value, noteButtonIndex, data)
		}
	}

	setNoteOn(noteValue, noteButtonIndex, data = {}) {
		var self = this;

		var eventListenerIndexes = Object.keys(eventListeners)
		
		notifyEventListeners('note_buttons_change', [...self.noteButtons])

		eventListenerIndexes.forEach(listenerIndex => {
			let listener = eventListeners[listenerIndex]
			
			if (listener.type === 'note_on') {
				listener.callback(noteValue, noteButtonIndex, data)
			}
		})
	}

	setNoteOff(noteValue, noteButtonIndex, data = {}) {
		var self = this;

		var eventListenerIndexes = Object.keys(eventListeners)

		notifyEventListeners('note_buttons_change', [...self.noteButtons])
		
		eventListenerIndexes.forEach(listenerIndex => {
			let listener = eventListeners[listenerIndex]
			
			if (listener.type === 'note_off') {
				listener.callback(noteValue, noteButtonIndex, data)
			}
		})
	}

	getConfig() {
		return {...this.config}
	}

	getNoteButtons() {
		return [...this.noteButtons]
	}

	get minOctave() {
		return 1
	}

	get maxOctave() {
		return 8
	}

	get minKey() {
		return 0
	}

	get maxKey() {
		return 11
	}

	get minPosition() {
		return 0
	}

	get maxPosition() {
		return 7
	}

	get minMode() {
		return 0
	}

	get maxMode() {
		return 7
	}

}