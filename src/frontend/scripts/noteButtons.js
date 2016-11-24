import NoteButton from './noteButton'
import notes from './notes'
import scales from './scales'
import {getNoteNameFromValue} from './utils'

const numOfNoteButtons = 8;
const noteButtons = [];
const config = {};

const defaultOctave = 4;
const defaultMode = 0;
const defaultPosition = 0;
const defaultKey = notes['C'];
const defaultScale = scales['major']

const defaultConfig = {
	octave: defaultOctave,
	position: defaultPosition, 
	mode: defaultMode,
	scale: defaultScale,
	key: defaultKey,		
}



/**
 * Set buttons based on config state
 * @param {array} noteButtons
 * @param {Object} configState - 
 * @param {number} configState.key - 
 * @param {number} configState.octave - 
 * @param {number} configState.position - 
 * @param {number} configState.mode - 
 * @param {Object} configState.scale -
 */
function setNoteButtonValues(noteButtons, configState) {
	let {key, octave, position, mode, scale} = configState;
	
	var degree = mode + position; //0 based degree
	var startValue = key + (octave * 12); //value assuming 0 offset/position

	noteButtons.forEach((noteButton, index) => {
		let offset = getOffsetFromDegreeInScale(degree, scale)
		noteButton.degreeDisplay = degree + 1;
		noteButton.value = startValue + offset;
		noteButton.noteDisplay = getNoteNameFromValue(noteButton.value, octave, offset)
		degree++;
	})
}

function setupInitialNoteButtonsAndConfig() {
	Object.assign(config, defaultConfig)

	for (var i = 0; i < numOfNoteButtons; i++) {
		noteButtons.push(new NoteButton())
	}

	setNoteButtonValues(noteButtons, config)
}

module.exports.setupInitialNoteButtonsAndConfig = setupInitialNoteButtonsAndConfig