import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import noteButton from './scripts/noteButton'
import NoteWriter from './scripts/noteWriter'
import triggerEvents from './scripts/triggerEvents'
import listenEvents from './scripts/listenEvents'
import WebMidi from 'webmidi'

var socket = io(SOCKET_URL);



socket.emit('trigger', {
	action: 'note_button_down',
	noteButtonIndex: 1,
	data: {},
})

const noteWriter = new NoteWriter();

triggerEvents(noteWriter)
listenEvents(noteWriter)
	
ReactDOM.render(<App noteWriter={noteWriter}/>, document.getElementById('root'));



