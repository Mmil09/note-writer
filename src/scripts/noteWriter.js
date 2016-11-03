
const eventListeners = {};
let eventListenerIndex = 0;

export default class NoteWriter {

	constructor(options = {}) {
		console.log('hello')
	}

	on(event, callback) {

		eventListeners[eventListenerIndex] = {type: event, callback: callback}
		
		var indexToDelete = JSON.parse(JSON.stringify(eventListenerIndex))

		var unsubscribe = function(index) {
			delete eventListeners[index]
			console.log(eventListeners)
		}.bind(null, indexToDelete)

		eventListenerIndex++;

		return unsubscribe;
	}

	trigger(action, data = {}) {
		var self = this;
		
		switch(action) {
			case 'note_button_down':
				self.handleNoteButtonDown(data)
				break;
			case 'note_button_up':
				self.handleNoteButtonUp(data)
				break;
			case 'key_change':
				break;
			case 'scale_change':
				break;
			case 'octave_change':
				break;
			case 'position_change':
				break;
			case 'mode_change':
		}
	}

	handleNoteButtonDown(data = {}) {
		console.log('down', data.buttonIndex)
		this.setNoteOn(0, 1)
	}

	handleNoteButtonUp(data = {}) {
		console.log('up', data.buttonIndex)
	}

	setNoteOn(noteValue, noteData) {
		var eventListenerIndexes = Object.keys(eventListeners)
		
		eventListenerIndexes.forEach(listenerIndex => {
			let listener = eventListeners[listenerIndex]
			
			if (listener.type === 'note_on') {
				listener.callback(noteValue, noteData)
			}
		})
	}

	setNotOff() {

	}


}