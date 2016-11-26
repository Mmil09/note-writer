var utils = require('./utils')

function NoteButton() {
	this.isPushed = false;
	this.degreeIndex = 0;
	this.degree = 1;
	this.noteValue = 0;
	this.channel = 1;
	this.velocity = 0;
}

module.exports = NoteButton

