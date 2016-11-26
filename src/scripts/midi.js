var easymidi = require('easymidi');

// var input = new easymidi.Input('Virtual input name', true);
var output = new easymidi.Output('NoteWriter Output', true);

var defaultNoteOnData = {
	velocity: 64,
	channel: 1
}

function sendNoteOn(noteValue, data) {
	var noteData = Object.assign({}, defaultNoteOnData, data);

	output.send('noteon', {
	  note: noteValue,
	  velocity: noteData.velocity,
	  channel: noteData.channel,
	});
}

function sendNoteOff(noteValue, data) {
	var noteData = Object.assign({}, defaultNoteOnData, data);

	output.send('noteoff', {
	  note: noteValue,
	  velocity: noteData.velocity,
	  channel: noteData.channel,
	});
}

module.exports = {
	sendNoteOn: sendNoteOn,
	sendNoteOff: sendNoteOff,
}