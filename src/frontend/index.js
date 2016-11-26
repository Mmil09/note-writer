import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import triggerEvents from './scripts/triggerEvents'
import listenEvents from './scripts/listenEvents'

var socket = io(SOCKET_URL);

triggerEvents(socket)
listenEvents(socket)

socket.on('note_buttons_change', function(noteButtons) {
	console.log('note_buttons_change', noteButtons)
})

socket.on('config_change', function(config) {
	console.log('config_change', config)
})

// const noteWriter = new NoteWriter();

// triggerEvents(noteWriter)
// listenEvents(noteWriter)
	
// ReactDOM.render(<App noteWriter={noteWriter}/>, document.getElementById('root'));



