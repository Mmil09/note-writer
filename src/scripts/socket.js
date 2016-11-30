var NoteWriter = require('../noteWriter').NoteWriter
var midi = require('./midi')
var server, io;


var noteWriter = new NoteWriter();

function setupSocket(app, socketPort) {
	server = require('http').Server(app);
	io = require('socket.io')(server);

	server.listen(socketPort);

	io.on('connection', function (socket) {

		socket.emit('config_change', noteWriter.getConfig())
		socket.emit('note_buttons_change', noteWriter.getNoteButtons())

		setupSocketIncoming(socket);

		setupSocketOutgoing(socket);

	});
}

function setupSocketIncoming(socket) {
  socket.on('note_button_down', function (data) {
    noteWriter.trigger('note_button_down', data)
  });

  socket.on('note_button_up', function (data) {
    noteWriter.trigger('note_button_up', data)
  });

  socket.on('position_change', function(data) {
  	noteWriter.trigger('position_change', data.positionIndex)
  });

  socket.on('octave_change', function(data) {
  	noteWriter.trigger('octave_change', data.octaveIndex)
  })

  socket.on('increment_key', function() {
  	noteWriter.trigger('increment_key')
  })

  socket.on('decrement_key', function() {
  	noteWriter.trigger('decrement_key')
  })

  socket.on('increment_octave', function() {
  	noteWriter.trigger('increment_octave')
  })

  socket.on('decrement_octave', function() {
  	noteWriter.trigger('decrement_octave')
  })

   socket.on('increment_position', function() {
  	noteWriter.trigger('increment_position')
  })

  socket.on('decrement_position', function() {
  	noteWriter.trigger('decrement_position')
  })
}

function setupSocketOutgoing(socket) {
	
	noteWriter.on('note_on', function(noteData) {
		//send midi note on
		midi.sendNoteOn(noteData.noteValue, noteData);
		//notify clients of note_on
		socket.emit('note_on', noteData)
	})

	noteWriter.on('note_off', function(noteData) {
		//send midi note off
		midi.sendNoteOff(noteData.noteValue, noteData);
		//notify clients of note_off
		socket.emit('note_off', noteData)
	})

	noteWriter.on('config_change', function(newConfig) {
		//notify clients of config_change
		socket.emit('config_change', newConfig)
	})

	noteWriter.on('note_buttons_change', function(noteButtons) {
		//notify clients of note_buttons_change
		socket.emit('note_buttons_change', noteButtons)
	})

}

function getNoteWriter() {
	return noteWriter
}

module.exports.setupSocket = setupSocket
module.exports.getNoteWriter = getNoteWriter