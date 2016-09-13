import {createStore} from 'redux'
import scales from '../scripts/scales'
import notes from '../scripts/notes'
import NoteButton from '../scripts/noteButton'
import {getNoteNameFromValue} from '../scripts/utils'


const defaultOctave = 4;
const defaultMode = 0;
const defaultPosition = 0;
const defaultKey = notes['C'];
const defaultScale = scales['major']
const numOfNoteButtons = 8;
const initialNoteButtons = [];

initializeNoteButtons();

const initialState = {
	noteButtons: initialNoteButtons,
	config: {
		octave: defaultOctave,
		position: defaultPosition, 
		mode: defaultMode,
		scale: defaultScale,
		key: defaultKey,		
	}

}

const appStore = createStore((state = initialState, action) => {
	switch(action.type) {
		case 'CONFIG_CHANGE':
			let newState = Object.assign({}, state)
			
			let newConfig = {
				...state.config,
				...action.data
			}

			newState.config = newConfig;

			setNoteButtonValues(newState.noteButtons, newConfig)

			
			return newState;
			break;

		case 'BUTTON_DOWN':
			var noteButtons = [...state.noteButtons]
			var button = noteButtons[action.index]
			button.isPushed = true;
			return {
				...state,
				...noteButtons,
			}
			break;
			
		case 'BUTTON_UP':
			var noteButtons = [...state.noteButtons]
			var button = noteButtons[action.index]
			button.isPushed = false;
			return {
				...state,
				...noteButtons,
			}
			break;

		default:
			return state;
	}
})


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

function initializeNoteButtons() {
	for (var i = 0; i < numOfNoteButtons; i++) {
		initialNoteButtons.push(new NoteButton())
	}

	setNoteButtonValues(initialNoteButtons, {
		octave: defaultOctave,
		scale: defaultScale,
		key:  defaultKey,
		mode: defaultMode,
		position: defaultPosition,
	})
}

module.exports = appStore